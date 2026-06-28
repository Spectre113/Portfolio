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

type EditableContextField = 'language' | 'theme';

type ContextUpdateState =
  | {
      field: null;
      phase: 'idle';
      characters: 0;
      fromValue: '';
      toValue: '';
    }
  | {
      field: EditableContextField;
      phase: 'deleting' | 'typing';
      characters: number;
      fromValue: string;
      toValue: string;
    };

type VisitorContext = {
  language: string;
  device: 'mobile' | 'tablet' | 'desktop';
  theme: 'light' | 'dark';
  motion: 'allowed' | 'reduced';
  timezone: string;
  online: boolean;
};

const TYPE_SPEED = 30;
const DELETE_SPEED = 18;
const JOKE_PAUSE = 1000;
const CONTEXT_LINE_INDEX_BY_FIELD: Record<EditableContextField, number> = {
  language: 1,
  theme: 3,
};
const EMPTY_UPDATE_STATE: ContextUpdateState = {
  field: null,
  phase: 'idle',
  characters: 0,
  fromValue: '',
  toValue: '',
};

const JOKE_RETURN: CodeToken[] = [
  { text: 'hireImmediately' },
  { text: '(', tone: 'operator' },
  { text: 'context' },
  { text: ')', tone: 'operator' },
  { text: ';' },
];

const CLEAN_RETURN: CodeToken[] = [
  { text: 'adaptExperience' },
  { text: '(', tone: 'operator' },
  { text: 'context' },
  { text: ')', tone: 'operator' },
  { text: ';' },
];

const RETURN_PREFIX: CodeToken[] = [
  { text: '  return', tone: 'keyword' },
  { text: ' ' },
];

const CLOSING_LINE: CodeToken[] = [{ text: '}' }];

function createStringToken(value: string): CodeToken {
  return { text: `'${value}'`, tone: 'string' };
}

function createContextLine(property: string, value: CodeToken): CodeToken[] {
  return [
    { text: `  ${property}`, tone: 'property' },
    { text: ': ' },
    value,
    { text: ',' },
  ];
}

function createStaticLines(context: VisitorContext): CodeToken[][] {
  return [
    [
      { text: 'const', tone: 'keyword' },
      { text: ' visitorContext ' },
      { text: '= ', tone: 'operator' },
      { text: '{' },
    ],
    createContextLine('language', createStringToken(context.language)),
    createContextLine('device', createStringToken(context.device)),
    createContextLine('theme', createStringToken(context.theme)),
    createContextLine('motion', createStringToken(context.motion)),
    createContextLine('timezone', createStringToken(context.timezone)),
    [
      { text: '  online', tone: 'property' },
      { text: ': ' },
      { text: String(context.online), tone: 'keyword' },
      { text: ',' },
    ],
    createContextLine('privacy', createStringToken('no personal data')),
    [{ text: '};' }],
    [],
    [
      { text: 'function', tone: 'keyword' },
      { text: ' adaptPortfolio' },
      { text: '(context) ', tone: 'operator' },
      { text: '{' },
    ],
  ];
}

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

function getDeviceType(width: number): VisitorContext['device'] {
  if (width < 640) {
    return 'mobile';
  }

  if (width < 1100) {
    return 'tablet';
  }

  return 'desktop';
}

function getPreferredTheme() {
  const theme = document.documentElement.dataset.theme;

  if (theme === 'dark' || theme === 'light') {
    return theme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getSiteLanguage() {
  const language = document.documentElement.dataset.language;

  if (language === 'ru' || language === 'en') {
    return language;
  }

  return document.documentElement.lang || navigator.language || 'unknown';
}

function getVisitorContext(): VisitorContext {
  if (typeof window === 'undefined') {
    return {
      language: 'unknown',
      device: 'desktop',
      theme: 'dark',
      motion: 'allowed',
      timezone: 'unknown',
      online: true,
    };
  }

  return {
    language: getSiteLanguage(),
    device: getDeviceType(window.innerWidth),
    theme: getPreferredTheme(),
    motion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'reduced'
      : 'allowed',
    timezone:
      Intl.DateTimeFormat().resolvedOptions().timeZone || 'local timezone',
    online: navigator.onLine,
  };
}

function useVisitorContext() {
  const [context, setContext] = useState(getVisitorContext);

  useEffect(() => {
    const syncContext = () => setContext(getVisitorContext());
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer =
      typeof MutationObserver === 'undefined'
        ? null
        : new MutationObserver(syncContext);

    window.addEventListener('resize', syncContext);
    window.addEventListener('online', syncContext);
    window.addEventListener('offline', syncContext);
    colorSchemeQuery.addEventListener('change', syncContext);
    motionQuery.addEventListener('change', syncContext);
    observer?.observe(document.documentElement, {
      attributeFilter: ['data-language', 'data-theme', 'lang'],
      attributes: true,
    });

    return () => {
      window.removeEventListener('resize', syncContext);
      window.removeEventListener('online', syncContext);
      window.removeEventListener('offline', syncContext);
      colorSchemeQuery.removeEventListener('change', syncContext);
      motionQuery.removeEventListener('change', syncContext);
      observer?.disconnect();
    };
  }, []);

  return context;
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

const jokeReturnLength = getLineLength(JOKE_RETURN);
const cleanReturnLength = getLineLength(CLEAN_RETURN);

export function useTypewriterSequence() {
  const context = useVisitorContext();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayedContext, setDisplayedContext] = useState(context);
  const [contextUpdate, setContextUpdate] =
    useState<ContextUpdateState>(EMPTY_UPDATE_STATE);
  const [state, setState] = useState<TypewriterState>({
    phase: 'typingJoke',
    introCharacters: 0,
    jokeCharacters: jokeReturnLength,
    cleanCharacters: 0,
  });

  const renderedContext = useMemo(() => {
    if (contextUpdate.field === null) {
      return displayedContext;
    }

    const visibleValue =
      contextUpdate.phase === 'deleting'
        ? contextUpdate.fromValue.slice(0, contextUpdate.characters)
        : contextUpdate.toValue.slice(0, contextUpdate.characters);

    return {
      ...displayedContext,
      [contextUpdate.field]: visibleValue,
    };
  }, [contextUpdate, displayedContext]);

  const staticLines = useMemo(
    () => createStaticLines(renderedContext),
    [renderedContext],
  );
  const jokeLines = useMemo(
    () => [...staticLines, [...RETURN_PREFIX, ...JOKE_RETURN]],
    [staticLines],
  );
  const cleanLines = useMemo(
    () => [...staticLines, [...RETURN_PREFIX, ...CLEAN_RETURN], CLOSING_LINE],
    [staticLines],
  );
  const jokeLength = useMemo(() => getLinesLength(jokeLines), [jokeLines]);
  const returnLineIndex = staticLines.length;
  const closingLineIndex = staticLines.length + 1;

  useEffect(() => {
    if (prefersReducedMotion || state.phase !== 'complete') {
      setDisplayedContext(context);
      setContextUpdate(EMPTY_UPDATE_STATE);
      return;
    }

    if (contextUpdate.field !== null) {
      return;
    }

    const changedField = (['language', 'theme'] as const).find(
      (field) => displayedContext[field] !== context[field],
    );

    if (!changedField) {
      setDisplayedContext(context);
      return;
    }

    setContextUpdate({
      field: changedField,
      phase: 'deleting',
      characters: displayedContext[changedField].length,
      fromValue: displayedContext[changedField],
      toValue: context[changedField],
    });
  }, [
    context,
    contextUpdate.field,
    displayedContext,
    prefersReducedMotion,
    state.phase,
  ]);

  useEffect(() => {
    if (contextUpdate.field === null) {
      return;
    }

    const delay =
      contextUpdate.phase === 'deleting' ? DELETE_SPEED : TYPE_SPEED;

    const timeout = window.setTimeout(() => {
      setContextUpdate((currentUpdate) => {
        if (currentUpdate.field === null) {
          return currentUpdate;
        }

        if (currentUpdate.phase === 'deleting') {
          if (currentUpdate.characters > 0) {
            return {
              ...currentUpdate,
              characters: currentUpdate.characters - 1,
            };
          }

          return {
            ...currentUpdate,
            phase: 'typing',
            characters: 0,
          };
        }

        if (currentUpdate.characters < currentUpdate.toValue.length) {
          return {
            ...currentUpdate,
            characters: currentUpdate.characters + 1,
          };
        }

        setDisplayedContext((currentContext) => ({
          ...currentContext,
          [currentUpdate.field]: currentUpdate.toValue,
        }));

        return EMPTY_UPDATE_STATE;
      });
    }, delay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [contextUpdate]);

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
  }, [jokeLength, prefersReducedMotion, state]);

  const lines = useMemo(() => {
    if (contextUpdate.field !== null) {
      return cleanLines;
    }

    if (prefersReducedMotion || state.phase === 'complete') {
      return cleanLines;
    }

    if (state.phase === 'typingJoke') {
      return revealLines(jokeLines, state.introCharacters);
    }

    if (state.phase === 'pauseJoke') {
      return jokeLines;
    }

    if (state.phase === 'deletingJoke') {
      return [
        ...staticLines,
        [...RETURN_PREFIX, ...revealTokens(JOKE_RETURN, state.jokeCharacters)],
      ];
    }

    if (state.phase === 'typingClean') {
      return [
        ...staticLines,
        [
          ...RETURN_PREFIX,
          ...revealTokens(CLEAN_RETURN, state.cleanCharacters),
        ],
      ];
    }

    return cleanLines;
  }, [
    cleanLines,
    contextUpdate.field,
    jokeLines,
    prefersReducedMotion,
    state,
    staticLines,
  ]);

  const cursorLineIndex = getCursorLineIndex({
    closingLineIndex,
    contextUpdateField: contextUpdate.field,
    lines,
    phase: prefersReducedMotion ? 'complete' : state.phase,
    returnLineIndex,
  });

  return {
    cursorLineIndex,
    lines,
    isAnimating:
      !prefersReducedMotion &&
      (state.phase !== 'complete' || contextUpdate.field !== null),
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
  closingLineIndex,
  contextUpdateField,
  lines,
  phase,
  returnLineIndex,
}: {
  closingLineIndex: number;
  contextUpdateField: EditableContextField | null;
  lines: CodeToken[][];
  phase: TypewriterPhase;
  returnLineIndex: number;
}) {
  if (contextUpdateField !== null) {
    return CONTEXT_LINE_INDEX_BY_FIELD[contextUpdateField];
  }

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
