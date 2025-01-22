# Set base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Instalează toate dependențele, inclusiv devDependencies
RUN npm install --legacy-peer-deps

# Copy the entire source code
COPY . .

# Expose the development server port
EXPOSE 5173

# Rulează serverul de development cu vite
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
