const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve static files from public folder
app.use(express.static('public'));

// Poll data - stored on the server
const poll = {
  question: "What is your favourite programming language?",
  options: {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    "C++": 0
  }
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send current poll results to the newly connected user
  socket.emit('pollUpdate', poll);

  // Listen for a vote from the client
  socket.on('vote', (option) => {
    if (poll.options[option] !== undefined) {
      poll.options[option]++;
      console.log(`Vote received for: ${option}`);

      // Broadcast updated results to ALL connected clients
      io.emit('pollUpdate', poll);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
