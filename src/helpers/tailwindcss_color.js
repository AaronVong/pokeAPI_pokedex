/**
 * Vì Tailwindcss không hỗ trợ dynamic classes đối với những theme BỔ SUNG trong 'tailwindcss.config.js'
 * Chính vì thế cần 'ghi' dynamic classes ít nhất 1 lần trong project để tailwindcss render
 * Ghi chú: file này phải nằm trong path 'content' ở 'tailwind.config.js' file
 */
const COLORS = {
  normal: "bg-normal",
  fire: "bg-fire",
  water: "bg-water",
  electric: "bg-electric",
  grass: "bg-grass",
  ice: "bg-ice",
  fighting: "bg-fighting",
  poison: "bg-poison",
  ground: "bg-ground",
  flying: "bg-flying",
  psychic: "bg-psychic",
  bug: "bg-bug",
  rock: "bg-rock",
  ghost: "bg-ghost",
  dragon: "bg-dragon",
  dark: "bg-dark",
  steel: "bg-steel",
  fairy: "bg-fairy",
};
