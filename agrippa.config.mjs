// @ts-check
import { defineConfig, Framework, Styling } from 'agrippa';

export default defineConfig({
  options: {
    baseDir: './apps/web/src/components',
    framework: Framework.REACT,
    styling: Styling.SCSS,
    typescript: true,
    createStylesFile: true,
    componentOptions: {
      declaration: 'const',
      exportType: 'named',
    },
    typescriptOptions: {
      propDeclaration: 'interface',
    },
    styleFileOptions: {
      module: true,
    },
  },
});
