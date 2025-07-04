import type { NextConfig } from "next"; // Importa o tipo NextConfig para tipagem do objeto de configuração

// Define a configuração do Next.js
const nextConfig: NextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"], // Permite carregar imagens deste domínio específico
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // aumenta o limite para 10MB
    },
  },
};

export default nextConfig; 