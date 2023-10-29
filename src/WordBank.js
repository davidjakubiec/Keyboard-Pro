import React, { useState, useEffect, useContext, useRef } from 'react'
import { Context } from './App'

const WordBank = () => {
    const el = useRef(null);
    const [placeholder, setPlaceholder] = useState('');
    const {wordIdx, setWordIdx, letterIdx, setLetterIdx, wordBank, setWordBank, testResults, setTestResults, viewResults} = useContext(Context);
    const dictionary = ["the", "be", "and", "of", "a", "in", "to", "have", "it", "I", "that", "for", "you", "he", "with", "on", "do", "say", "this", "they", "at",
      "but", "we", "his", "from", "not", "by", "she", "or", "as", "what", "go", "their", "can", "who", "get", "if", "would", "her", "all",
      "my", "make", "about", "know", "will", "as", "up", "one", "time", "has", "been", "there", "year", "so", "think", "when", "which",
      "them", "some", "me", "people", "take", "out", "into", "just", "see", "him", "your", "come", "could", "now", "than", "like", "other",
      "how", "then", "its", "our", "two", "more", "these", "want", "way", "look", "first", "also", "new", "because", "day", "more", "use",
      "no", "man", "find", "here", "thing", "give", "many", "well", "only", "those", "tell", "very", "even", "back", "any", "good", "woman",
      "through", "us", "life", "child", "there", "work", "down", "may", "after", "should", "call", "world", "over", "school", "still",
      "try", "last", "ask", "need", "too", "feel", "three", "when", "state", "never", "become", "between", "high", "really", "something",
      "most", "another", "much", "family", "own", "leave", "put", "old", "while", "mean", "on", "keep", "student", "why", "let", "great",
      "same", "big", "group", "begin", "seem", "country", "help", "talk", "where", "turn", "problem", "every", "start", "hand", "might",
      "American", "show", "part", "about", "against", "place", "over", "such", "again", "few", "case", "most", "week", "company", "where",
      "system", "each", "right", "program", "hear", "so", "question", "during", "work", "play", "government", "run", "small", "number",
      "off", "always", "move", "like", "night", "live", "Mr", "point", "believe", "hold", "today", "bring", "happen", "next", "without",
      "before", "large", "all", "million", "must", "home", "under", "water", "room", "write", "mother", "area", "national", "money",
      "story", "young", "fact", "month", "different", "lot", "study", "book", "eye", "job", "word", "though", "business", "issue",
      "side", "kind", "four", "head", "far", "black", "long", "both", "little", "house", "yes", "after", "since", "long", "provide",
      "service", "around", "friend", "important", "father", "sit", "away", "until", "power", "hour", "game", "often", "yet", "line",
      "political", "end", "among", "ever", "stand", "bad", "lose", "however", "member", "pay", "law", "meet", "car", "city", "almost",
      "include", "continue", "set", "later", "community", "much", "name", "five", "once", "white", "least", "president", "learn",
      "real", "change", "team", "minute", "best", "several", "idea", "kid", "body", "information", "nothing", "ago", "right", "lead",
      "social", "understand", "whether", "watch", "together", "follow", "around", "parent", "only", "stop", "face", "anything", "create",
      "public", "already", "speak", "others", "read", "level", "allow", "add", "office", "spend", "door", "health", "person", "art",
      "sure", "war", "history", "party", "within", "grow", "result", "open", "change", "morning", "walk", "reason", "low", "win",
      "research", "girl", "guy", "early", "food", "before", "moment", "himself", "air", "teacher", "force", "offer", "enough",
      "education", "across", "although", "remember", "foot", "second", "boy", "maybe", "toward", "able", "age", "off", "policy",
      "everything", "love", "process", "music", "including", "consider", "appear", "actually", "buy", "probably", "human", "wait",
      "serve", "market", "die", "send", "expect", "home", "sense", "build", "stay", "fall", "oh", "nation", "plan", "cut", "college",
      "interest", "death", "course", "someone", "experience", "behind", "reach", "local", "kill", "six", "remain", "effect", "yeah",
      "suggest", "class", "control", "raise", "care", "perhaps", "little", "late", "hard", "field", "else", "pass", "former", "sell",
      "major", "sometimes", "require", "along", "development", "themselves", "report", "role", "better", "economic", "effort", "decide",
      "rate", "strong", "possible", "heart", "drug", "show", "leader", "light", "voice", "wife", "whole", "police", "mind", "finally",
      "pull", "return", "free", "military", "price", "report", "less", "according", "decision", "explain", "son", "hope", "even", "develop",
      "view", "relationship", "carry", "town", "road", "drive", "arm", "true", "federal", "break", "better", "difference", "thank",
      "receive", "value", "international", "building", "action", "full", "model", "join", "season", "society", "because", "tax", "director",
      "early", "position", "player", "agree", "especially", "record", "pick", "wear", "paper", "special", "space", "ground", "form",
      "support", "event", "official", "whose", "matter", "everyone", "center", "couple", "site", "project", "hit", "base", "activity",
      "star", "table", "need", "court", "produce", "eat", "American", "teach", "oil", "half", "situation", "easy", "cost", "industry",
      "figure", "face", "street", "image", "itself", "phone", "either", "data", "cover", "quite", "picture", "clear", "practice",
      "piece", "land", "recent", "describe", "product", "doctor", "wall", "patient", "worker", "news", "test", "movie", "certain",
      "north", "love", "personal", "open", "support", "simply", "third", "technology", "catch", "step", "baby", "computer", "type",
      "attention", "draw", "film", "Republican", "tree", "source", "red", "nearly", "organization", "choose", "cause", "hair",
      "look", "point", "century", "evidence", "window", "difficult", "listen", "soon", "culture", "billion", "chance", "brother",
      "energy", "period", "course", "summer", "less", "realize", "hundred", "available", "plant", "likely", "opportunity", "term",
      "short", "letter", "condition", "choice", "place", "single", "rule", "daughter", "administration", "south", "husband",
      "Congress", "floor", "campaign", "material", "population", "well", "call", "economy", "medical", "hospital", "church", "close",
      "thousand", "risk", "current", "fire", "future", "wrong", "involve", "defense", "anyone", "increase", "security", "bank", "myself",
      "certainly", "west", "sport", "board", "seek", "per", "subject", "officer", "private", "rest", "behavior", "deal", "performance",
      "fight", "throw", "top", "quickly", "past", "goal", "second", "bed", "order", "author", "fill", "represent", "focus", "foreign",
      "drop", "plan", "blood", "upon", "agency", "push", "nature", "color", "no", "recently", "store", "reduce", "sound", "note",
      "fine", "before", "near", "movement", "page", "enter", "share", "than", "common", "poor", "other", "natural", "race", "concern",
      "series", "significant", "similar", "hot", "language", "usually", "response", "dead", "rise", "animal", "factor", "decade", "article",
      "shoot", "east", "save", "seven", "artist", "scene", "stock", "career", "despite", "central", "eight", "thus", "treatment", "beyond",
      "happy", "exactly", "protect", "approach", "lie", "size", "dog", "fund", "serious", "occur", "media", "ready", "sign", "thought",
      "list", "individual", "simple", "quality", "pressure", "accept", "answer", "resource", "identify", "left", "meeting", "determine",
      "prepare", "disease", "whatever", "success", "argue", "cup", "particularly", "amount", "ability", "staff", "recognize", "indicate",
      "character", "growth", "loss", "degree", "wonder", "attack", "herself", "region", "television", "box", "TV", "training", "pretty",
      "trade", "deal", "election", "everybody", "physical", "lay", "general", "feeling", "standard", "bill", "message", "fail", "outside",
      "arrive", "analysis", "benefit", "name", "forward", "lawyer", "present", "section", "environmental", "glass", "answer",
      "skill", "sister", "PM", "professor", "operation", "financial", "crime", "stage", "ok", "compare", "authority", "miss", "design",
      "sort", "act", "ten", "knowledge", "gun", "station", "blue", "strategy", "clearly", "discuss", "indeed", "truth", "song",
      "example", "democratic", "check", "environment", "leg", "dark", "public", "various", "rather", "laugh", "guess", "executive",
      "set", "study", "prove", "hang", "entire", "rock", "design", "enough", "forget", "since", "claim", "note", "remove", "manager",
      "help", "close", "sound", "enjoy"]

    useEffect(() => {
        // fetch('http://localhost:3000/api/example/wordbank')
        //   .then((response) => response.json())
        //   .then((result) => {
        //     console.log(result)
        //     setWordBank(result);
        //   })
        //   .catch((error) => {
        //     console.error('Error fetching data:', error);
        //   });

        function getRandomElementsFromArray(array, numberOfElements) {
          if (numberOfElements > array.length) {
            throw new Error('Number of elements requested exceeds the length of the array.');
          }
          
          // Copy the original array to avoid modifying the original array
          const copyArray = array.slice();
          
          // Shuffle the copied array using Fisher-Yates algorithm
          for (let i = copyArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
          }
          
          // Return the first numberOfElements elements from the shuffled array
          return copyArray.slice(0, numberOfElements);
        }
        const newArray = getRandomElementsFromArray(dictionary, 300)
        const dictionaryArray = [];
        for (let i = 0; i < newArray.length; i++) {
          dictionaryArray.push({"word": newArray[i]})
        }
        console.log("dictionaryarray", dictionaryArray)
        setWordBank(dictionaryArray)

      }, []);
      const words = wordBank.map((row) => row.word);


  return (
      <div className="wordbank-container">
        {
          words.map((str, index) => (
            <>
              <span className="wordbank" style={{ backgroundColor: index === 0 ? '#D3D3D3' : 'transparent' }} id={index}>{str}</span>
              <span className="wordbank">{" "}</span>
            </>
          ))
        }
      </div>
  )
}

export default WordBank