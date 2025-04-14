const fs = require("fs");
const https = require("https");

https.get("https://animechan.vercel.app/api/random", (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const quote = JSON.parse(data);
    const formattedQuote = `> *"${quote.quote}"* — **${quote.character}** from *${quote.anime}*`;

    let readme = fs.readFileSync("README.md", "utf8");

    const updatedReadme = readme.replace(
      /<!-- QUOTE_START -->[\s\S]*<!-- QUOTE_END -->/,
      `<!-- QUOTE_START -->\n${formattedQuote}\n<!-- QUOTE_END -->`
    );

    fs.writeFileSync("README.md", updatedReadme);
  });
});
