import { defineConfig, } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
  },
  component: {
    devServer(cypressConfig: any) {
      // return devServer instance or a promise that resolves to
      // a dev server here
      return {
        port: 4300,
        close: () => {},
      };
    },
    specPattern: 'src/**/*.cy.{js,jsx,ts,tsx}',
  },
});
