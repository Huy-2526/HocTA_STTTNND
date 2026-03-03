export interface VocabWord {
  id: string
  word: string
  image: string
  category: string
  phonetic: string
  sentence: string
}

export interface VocabCategory {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
  words: VocabWord[]
}

export const categories: VocabCategory[] = [
  {
    id: "animals",
    name: "Animals",
    icon: "🐾",
    color: "text-primary",
    bgColor: "bg-primary/10",
    words: [
      { id: "cat", word: "Cat", image: "🐱", category: "animals", phonetic: "/kat/", sentence: "The cat is soft." },
      { id: "dog", word: "Dog", image: "🐶", category: "animals", phonetic: "/dɒɡ/", sentence: "The dog runs fast." },
      { id: "bird", word: "Bird", image: "🐦", category: "animals", phonetic: "/bɜːrd/", sentence: "The bird can fly." },
      { id: "fish", word: "Fish", image: "🐟", category: "animals", phonetic: "/fɪʃ/", sentence: "The fish swims." },
      { id: "cow", word: "Cow", image: "🐄", category: "animals", phonetic: "/kaʊ/", sentence: "The cow gives milk." },
      { id: "hen", word: "Hen", image: "🐔", category: "animals", phonetic: "/hɛn/", sentence: "The hen lays eggs." },
      { id: "lion", word: "Lion", image: "🦁", category: "animals", phonetic: "/ˈlaɪ.ən/", sentence: "The lion is strong." },
      { id: "rabbit", word: "Rabbit", image: "🐰", category: "animals", phonetic: "/ˈræbɪt/", sentence: "The rabbit hops." },
    ],
  },
  {
    id: "colors",
    name: "Colors",
    icon: "🎨",
    color: "text-accent",
    bgColor: "bg-accent/10",
    words: [
      { id: "red", word: "Red", image: "🔴", category: "colors", phonetic: "/rɛd/", sentence: "The apple is red." },
      { id: "blue", word: "Blue", image: "🔵", category: "colors", phonetic: "/bluː/", sentence: "The sky is blue." },
      { id: "green", word: "Green", image: "🟢", category: "colors", phonetic: "/ɡriːn/", sentence: "The grass is green." },
      { id: "yellow", word: "Yellow", image: "🟡", category: "colors", phonetic: "/ˈjɛloʊ/", sentence: "The sun is yellow." },
      { id: "orange", word: "Orange", image: "🟠", category: "colors", phonetic: "/ˈɒrɪndʒ/", sentence: "The orange is orange." },
      { id: "pink", word: "Pink", image: "🩷", category: "colors", phonetic: "/pɪŋk/", sentence: "The flower is pink." },
      { id: "white", word: "White", image: "⬜", category: "colors", phonetic: "/waɪt/", sentence: "The cloud is white." },
      { id: "black", word: "Black", image: "⬛", category: "colors", phonetic: "/blæk/", sentence: "The cat is black." },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    icon: "🍎",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    words: [
      { id: "apple", word: "Apple", image: "🍎", category: "fruits", phonetic: "/ˈæpəl/", sentence: "I eat an apple." },
      { id: "banana", word: "Banana", image: "🍌", category: "fruits", phonetic: "/bəˈnænə/", sentence: "The banana is yellow." },
      { id: "grape", word: "Grape", image: "🍇", category: "fruits", phonetic: "/ɡreɪp/", sentence: "I like grapes." },
      { id: "mango", word: "Mango", image: "🥭", category: "fruits", phonetic: "/ˈmæŋɡoʊ/", sentence: "The mango is sweet." },
      { id: "watermelon", word: "Watermelon", image: "🍉", category: "fruits", phonetic: "/ˈwɔːtərmelən/", sentence: "Watermelon is big." },
      { id: "strawberry", word: "Strawberry", image: "🍓", category: "fruits", phonetic: "/ˈstrɔːberi/", sentence: "The strawberry is red." },
    ],
  },
  {
    id: "body",
    name: "My Body",
    icon: "🧍",
    color: "text-success",
    bgColor: "bg-success/10",
    words: [
      { id: "eyes", word: "Eyes", image: "👀", category: "body", phonetic: "/aɪz/", sentence: "I see with my eyes." },
      { id: "ears", word: "Ears", image: "👂", category: "body", phonetic: "/ɪrz/", sentence: "I hear with my ears." },
      { id: "nose", word: "Nose", image: "👃", category: "body", phonetic: "/noʊz/", sentence: "I smell with my nose." },
      { id: "mouth", word: "Mouth", image: "👄", category: "body", phonetic: "/maʊθ/", sentence: "I eat with my mouth." },
      { id: "hand", word: "Hand", image: "✋", category: "body", phonetic: "/hænd/", sentence: "I wave my hand." },
      { id: "foot", word: "Foot", image: "🦶", category: "body", phonetic: "/fʊt/", sentence: "I walk with my feet." },
    ],
  },
  {
    id: "numbers",
    name: "Numbers",
    icon: "🔢",
    color: "text-[#B8860B]",
    bgColor: "bg-secondary/20",
    words: [
      { id: "one", word: "One", image: "1️⃣", category: "numbers", phonetic: "/wʌn/", sentence: "I have one nose." },
      { id: "two", word: "Two", image: "2️⃣", category: "numbers", phonetic: "/tuː/", sentence: "I have two eyes." },
      { id: "three", word: "Three", image: "3️⃣", category: "numbers", phonetic: "/θriː/", sentence: "There are three cats." },
      { id: "four", word: "Four", image: "4️⃣", category: "numbers", phonetic: "/fɔːr/", sentence: "I see four birds." },
      { id: "five", word: "Five", image: "5️⃣", category: "numbers", phonetic: "/faɪv/", sentence: "I have five fingers." },
      { id: "six", word: "Six", image: "6️⃣", category: "numbers", phonetic: "/sɪks/", sentence: "There are six eggs." },
      { id: "seven", word: "Seven", image: "7️⃣", category: "numbers", phonetic: "/ˈsɛvən/", sentence: "Seven days in a week." },
      { id: "eight", word: "Eight", image: "8️⃣", category: "numbers", phonetic: "/eɪt/", sentence: "The spider has eight legs." },
      { id: "nine", word: "Nine", image: "9️⃣", category: "numbers", phonetic: "/naɪn/", sentence: "I have nine crayons." },
      { id: "ten", word: "Ten", image: "🔟", category: "numbers", phonetic: "/tɛn/", sentence: "I can count to ten." },
    ],
  },
  {
    id: "family",
    name: "Family",
    icon: "👨‍👩‍👧‍👦",
    color: "text-primary",
    bgColor: "bg-primary/10",
    words: [
      { id: "mother", word: "Mother", image: "👩", category: "family", phonetic: "/ˈmʌðər/", sentence: "My mother is kind." },
      { id: "father", word: "Father", image: "👨", category: "family", phonetic: "/ˈfɑːðər/", sentence: "My father is tall." },
      { id: "sister", word: "Sister", image: "👧", category: "family", phonetic: "/ˈsɪstər/", sentence: "My sister plays with me." },
      { id: "brother", word: "Brother", image: "👦", category: "family", phonetic: "/ˈbrʌðər/", sentence: "My brother is funny." },
      { id: "baby", word: "Baby", image: "👶", category: "family", phonetic: "/ˈbeɪbi/", sentence: "The baby is small." },
      { id: "grandma", word: "Grandma", image: "👵", category: "family", phonetic: "/ˈɡrænmɑː/", sentence: "Grandma tells stories." },
    ],
  },
]

export function getAllWords(): VocabWord[] {
  return categories.flatMap((cat) => cat.words)
}
