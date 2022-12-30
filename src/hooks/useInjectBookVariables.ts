import { useCallback } from 'react';
import type { BookOptions, Theme, ePubCfi } from '../types';
import template from '../template';
import type { SourceType } from '../utils/enums/source-type.enum';

export function useInjectBookVariables() {
  const injectBookVariables = useCallback(
    ({
      type,
      book,
      bookOptions,
      theme,
      enableSelection,
      locations,
    }: {
      type: SourceType;
      book: string;
      bookOptions?: BookOptions,
      theme: Theme;
      enableSelection: boolean;
      locations?: ePubCfi[];
    }) => {
      return template
        .replace(/const type = window.type;/, `const type = '${type}';`)
        .replace(/const file = window.book;/, `const file = '${book}';`)
        .replace(/const bookOptions = window.book_options;/, `const bookOptions = ${JSON.stringify(bookOptions || {})};`)
        .replace(
          /const theme = window.theme;/,
          `const theme = ${JSON.stringify(theme)};`
        )
        .replace(
          /const initialLocations = window.locations;/,
          `const initialLocations = ${locations};`
        )
        .replace(
          /const enableSelection = window.enable_selection;/,
          `const enableSelection = ${enableSelection};`
        );
    },
    []
  );

  return { injectBookVariables };
}
