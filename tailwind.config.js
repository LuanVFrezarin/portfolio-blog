/** @type {import('tailwindcss').Config} */
// Configuração do Tailwind CSS, define onde procurar classes e temas customizados
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Procura classes CSS nesses arquivos da pasta app
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // E também nos componentes
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // E nas libs
  ],
  darkMode: "class", // Modo escuro ativado via classe no HTML
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"], // Define fonte padrão usando Inter
      },
    },
  },
  plugins: [], // Plugins extras do Tailwind (nenhum por enquanto)
};
