module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./public/index.html",
    ],
    theme: {
      extend: {
        rotate: {
          'x-45': 'rotateX(45deg)',
          'x-90': 'rotateX(90deg)',
          'x-180': 'rotateX(180deg)',
          'y-45': 'rotateY(45deg)',
          'y-90': 'rotateY(90deg)',
          'y-180': 'rotateY(180deg)',
          'x-30': 'rotateX(30deg)',
          'y-30': 'rotateY(30deg)',
          // Add any additional degrees as needed
        },
      }
    },
    plugins: [],
  };