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
const JOKE_TEXT = "'ChatGPT: make beautiful and awesome website'";

const STATIC_LINES: CodeToken[][] = [
  [
    { text: 'const', tone: 'keyword' },
    { text: ' developer ' },
    { text: '= ', tone: 'operator' },
    { text: '{' },
  ],
  [
    { text: '  name', tone: 'property' },
    { text: ': ' },
    { text: "'Vladimir Toporkov'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  nickname', tone: 'property' },
    { text: ': ' },
    { text: "'Spectre'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  role', tone: 'property' },
    { text: ': ' },
    { text: "'Frontend Developer'", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  stack', tone: 'property' },
    { text: ': ' },
    { text: "['React', 'TypeScript', 'Vite', 'Zod']", tone: 'string' },
    { text: ',' },
  ],
  [
    { text: '  focus', tone: 'property' },
    { text: ': ' },
    {
      text: "['Clean UI', 'API Integration', 'Responsive Layout']",
      tone: 'string',
    },
    { text: ',' },
  ],
  [
    { text: '  learning', tone: 'property' },
    { text: ': ' },
    { text: "['Next.js', 'Testing', 'Accessibility']", tone: 'string' },
    { text: ',' },
  ],
  [{ text: '};' }],
  [],
  [
    { text: 'function', tone: 'keyword' },
    { text: ' createExperience' },
    { text: '() ', tone: 'operator' },
    { text: '{' },
  ],
];

const RETURN_PREFIX: CodeToken[] = [
  { text: '  return', tone: 'keyword' },
  { text: ' ' },
];

const JOKE_RETURN: CodeToken[] = [
  { text: JOKE_TEXT, tone: 'string' },
  { text: ';' },
];

const CLEAN_RETURN: CodeToken[] = [
  { text: "'Clean code + great design'", tone: 'string' },
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
