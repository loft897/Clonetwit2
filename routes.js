const displayContent = (req, res) => {
  console.log("Connexion OK !");

  const url = req.url;
  const method = req.method;

  if (url == "/profile") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h2>This is profile page</h2>");
    return res.end();
  } else if (url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Cheeseburgers</h1>");
    return res.end();
  } else if (url == "/settings" && method == "POST") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Form was submitted !</h1>");
    return res.end();
  } else if (url == "/settings") {
    res.setHeader("Content-Type", "text/html");
    res.write(
      '<h1>Settings</h1><form action="/settings" method="POST"><input type="test"><button type="submit">Press Me</button></form>'
    );
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<h1>page not found</h1>");
  res.end();
};

module.exports = displayContent;
