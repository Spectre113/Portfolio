import { useEffect, useMemo, useState } from 'react';

type TokenTone = 'keyword' | 'operator' | 'property' | 'string';

export type CodeToken = {
  text: string;
  tone?: TokenTone;
};

type TypewriterPhase =
  | 'typingJoke'
  | 'pauseJoke'
  | 'deletingJoke'
  | 'typingClean'
  | 'complete';

type TypewriterState = {
  phase: TypewriterPhase;
  introCharacters: number;
  jokeCharacters: number;
  cleanCharacters: number;
};

const TYPE_SPEED = 30;
const DELETE_SPEED = 18;
const JOKE_PAUSE = 1000;
const JOKE_TEXT = 'shipPrettyUI()';

const STATIC_LINES: CodeToken[][] = [
  [
    { text: 'const', tone: 'keyword' },
    { text: ' userSignals ' },
    { text: '= ', tone: 'operator' },
    { text: '{' },
  ],
  [
    { text: '  projectViews', tone: 'property' },
    { text: ': ' },
    { text: 'track' },
    { text: '(', tone: 'operator' },
    { text: "'project_card_open'", tone: 'string' },
    { text: ')', tone: 'operator' },
    { text: ',' },
  ],
  [
    { text: '  resumeClicks', tone: 'property' },
    { text: ': ' },
    { text: 'track' },
    { text: '(', tone: 'operator' },
    { text: "'resume_download'", tone: 'string' },
    { text: ')', tone: 'operator' },
    { text: ',' },
  ],
  [
    { text: '  contactIntent', tone: 'property' },
    { text: ': ' },
    { text: 'track' },
    { text: '(', tone: 'operator' },
    { text: "'contact_open'", tone: 'string' },
    { text: ')', tone: 'operator' },
    { text: ',' },
  ],
  [
    { text: '  assistantQuestions', tone: 'property' },
    { text: ': ' },
    { text: 'track' },
    { text: '(', tone: 'operator' },
    { text: "'ai_prompt_submit'", tone: 'string' },
    { text: ')', tone: 'operator' },
    { text: ',' },
  ],
  [
    { text: '  respectPrivacy', tone: 'property' },
    { text: ': ' },
    { text: 'true', tone: 'keyword' },
    { text: ',' },
  ],
  [
    { text: '  collectPersonalData', tone: 'property' },
    { text: ': ' },
    { text: 'false', tone: 'keyword' },
    { text: ',' },
  ],
  [{ text: '};' }],
  [],
  [
    { text: 'function', tone: 'keyword' },
    { text: ' tuneExperience' },
    { text: '(signals) ', tone: 'operator' },
    { text: '{' },
  ],
];

const RETURN_PREFIX: CodeToken[] = [
  { text: '  return', tone: 'keyword' },
  { text: ' ' },
];

const JOKE_RETURN: CodeToken[] = [
  { text: JOKE_TEXT },
  { text: ';' },
];

const CLEAN_RETURN: CodeToken[] = [
  { text: 'improveUX' },
  { text: '(', tone: 'operator' },
  { text: 'signals' },
  { text: ')', tone: 'operator' },
  { text: ';' },
];

const CLOSING_LINE: CodeToken[] = [{ text: '}' }];

const JOKE_LINES = [...STATIC_LINES, [...RETURN_PREFIX, ...JOKE_RETURN]];
const CLEAN_LINES = [
  ...STATIC_LINES,
  [...RETURN_PREFIX, ...CLEAN_RETURN],
  CLOSING_LINE,
];

function getLineLength(line: CodeToken[]) {
  return line.reduce((total, token) => total + token.text.length, 0);
}

function getLinesLength(lines: CodeToken[][]) {
  return lines.reduce((total, line) => total + getLineLength(line) + 1, 0);
}

function revealTokens(tokens: CodeToken[], visibleCharacters: number) {
  let remainingCharacters = visibleCharacters;
  const visibleTokens: CodeToken[] = [];

  for (const token of tokens) {
    if (remainingCharacters <= 0) {
      break;
    }

    const visibleText = token.text.slice(0, remainingCharacters);
    visibleTokens.push({ ...token, text: visibleText });
    remainingCharacters -= token.text.length;
  }

  return visibleTokens;
}

function revealLines(lines: CodeToken[][], visibleCharacters: number) {
  let remainingCharacters = visibleCharacters;

  return lines.map((line) => {
    const visibleLine = revealTokens(line, remainingCharacters);
    remainingCharacters -= getLineLength(line) + 1;

    return visibleLine;
  });
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

const jokeLength = getLinesLength(JOKE_LINES);
const jokeReturnLength = getLineLength(JOKE_RETURN);
const cleanReturnLength = getLineLength(CLEAN_RETURN);
const returnLineIndex = STATIC_LINES.length;
const closingLineIndex = STATIC_LINES.length + 1;

export function useTypewriterSequence() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<TypewriterState>({
    phase: 'typingJoke',
    introCharacters: 0,
    jokeCharacters: jokeReturnLength,
    cleanCharacters: 0,
  });

  useEffect(() => {
    if (prefersReducedMotion || state.phase === 'complete') {
      return;
    }

    const timeout = window.setTimeout(() => {
      setState((currentState) => {
        if (
          currentState.phase === 'typingJoke' &&
          currentState.introCharacters < jokeLength
        ) {
          return {
            ...currentState,
            introCharacters: currentState.introCharacters + 1,
          };
        }

        if (currentState.phase === 'typingJoke') {
          return { ...currentState, phase: 'pauseJoke' };
        }

        if (currentState.phase === 'pauseJoke') {
          return {
            phase: 'deletingJoke',
            introCharacters: jokeLength,
            jokeCharacters: jokeReturnLength,
            cleanCharacters: 0,
          };
        }

        if (
          currentState.phase === 'deletingJoke' &&
          currentState.jokeCharacters > 0
        ) {
          return {
            ...currentState,
            jokeCharacters: currentState.jokeCharacters - 1,
          };
        }

        if (currentState.phase === 'deletingJoke') {
          return {
            phase: 'typingClean',
            introCharacters: jokeLength,
            jokeCharacters: 0,
            cleanCharacters: 0,
          };
        }

        if (
          currentState.phase === 'typingClean' &&
          currentState.cleanCharacters < cleanReturnLength
        ) {
          const nextCleanCharacters = currentState.cleanCharacters + 1;

          if (nextCleanCharacters >= cleanReturnLength) {
            return {
              ...currentState,
              phase: 'complete',
              cleanCharacters: nextCleanCharacters,
            };
          }

          return {
            ...currentState,
            cleanCharacters: nextCleanCharacters,
          };
        }

        return { ...currentState, phase: 'complete' };
      });
    }, getPhaseDelay(state.phase));

    return () => {
      window.clearTimeout(timeout);
    };
  }, [prefersReducedMotion, state]);

  const lines = useMemo(() => {
    if (prefersReducedMotion || state.phase === 'complete') {
      return CLEAN_LINES;
    }

    if (state.phase === 'typingJoke') {
      return revealLines(JOKE_LINES, state.introCharacters);
    }

    if (state.phase === 'pauseJoke') {
      return JOKE_LINES;
    }

    if (state.phase === 'deletingJoke') {
      return [
        ...STATIC_LINES,
        [...RETURN_PREFIX, ...revealTokens(JOKE_RETURN, state.jokeCharacters)],
      ];
    }

    if (state.phase === 'typingClean') {
      return [
        ...STATIC_LINES,
        [
          ...RETURN_PREFIX,
          ...revealTokens(CLEAN_RETURN, state.cleanCharacters),
        ],
      ];
    }

    return CLEAN_LINES;
  }, [prefersReducedMotion, state]);

  const cursorLineIndex = getCursorLineIndex({
    lines,
    phase: prefersReducedMotion ? 'complete' : state.phase,
  });

  return {
    cursorLineIndex,
    lines,
    isAnimating: !prefersReducedMotion && state.phase !== 'complete',
  };
}

function getPhaseDelay(phase: TypewriterPhase) {
  if (phase === 'pauseJoke') {
    return JOKE_PAUSE;
  }

  if (phase === 'deletingJoke') {
    return DELETE_SPEED;
  }

  return TYPE_SPEED;
}

function getCursorLineIndex({
  lines,
  phase,
}: {
  lines: CodeToken[][];
  phase: TypewriterPhase;
}) {
  if (
    phase === 'pauseJoke' ||
    phase === 'deletingJoke' ||
    phase === 'typingClean'
  ) {
    return returnLineIndex;
  }

  if (phase === 'complete') {
    return closingLineIndex;
  }

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (lines[index].some((token) => token.text.length > 0)) {
      return index;
    }
  }

  return 0;
}
