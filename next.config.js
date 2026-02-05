/** @type {import('next').NextConfig} */
// Aqui é a configuração do Next.js, tipo o arquivo de setup do projeto
const nextConfig = {
  images: {
    // Configuração para permitir imagens de domínios externos, tipo Unsplash e UI Avatars
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
    ],
  },
};

// Exporta a config pra o Next usar
module.exports = nextConfig;
