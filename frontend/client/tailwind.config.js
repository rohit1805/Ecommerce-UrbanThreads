/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nosifer': ['Nosifer', 'sans-serif'],
        'rocknroll' : [ 'RocknRoll One', 'sans-serif'],
        'kavivanor' : ['Kavivanar', 'cursive'],
        'roboto' : ["Roboto",'sans-serif'],
        'fondamento' : ["Fondamento", 'cursive'],
        "montagu" : ["Montagu Slab", "serif"]
      }
    },
  },
  plugins: [],
}

