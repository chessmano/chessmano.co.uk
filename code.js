const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const token = "MTIyODA1MjY0NjI2NzU4NDY4Mw.Gpadrb.33YU2xKZyLuaKe1DRrmTDgQuOdczOJtnIPD3HM";

// Function to get the current date in the UK timezone
function getFormattedDate() {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date().toLocaleDateString('en-GB', options);
    return `It's ${date}`;
}

// Function to get the current time in the UK timezone
function getFormattedTime() {
    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    const time = new Date().toLocaleTimeString('en-GB', options);
    return `and the time is ${time}`;
}

// Define user inputs and corresponding AI responses
const responses = {
    "hello": ["Hello! How can I assist you today?", "Hey there! What can I help you with?", "Hi! What's on your mind?"],
    "how are you?": ["I'm just a bot, but I'm here to help!", "I'm doing well, thanks for asking!", "I'm here and ready to assist!"],
    "test": ["Test successful! Everything seems to be working fine.", "Looks like the test went well!", "Test complete, no issues detected."],
    "bye": ["Goodbye! Feel free to reach out anytime if you need assistance.", "See you later! Don't hesitate to come back if you need help.", "Bye! Take care."],
    "give me weather update": ["The weather is always changing, isn't it?", "I can't control the weather, but I'm happy to provide information about it!"],
    "can you recommend a movie": ["Sure, what genre are you interested in?", "Let me think... How about 'The Shawshank Redemption'? It's a classic!"],
    "im bored what should i do": ["Let's find something fun to do! How about playing a game or watching a movie?", "I can suggest some activities if you're feeling bored."],
    "how do i change my profile picture": ["You can change your profile picture in the settings menu.", "To change your profile picture, go to your profile settings and upload a new image."],
    "how can i customize my settings": ["Yes, you can customize various settings such as theme, notifications, and privacy.", "Customizing your settings allows you to personalize your experience."],
    "i need help with something": ["I'm here to help! What do you need assistance with?", "Don't hesitate to ask if you need help."],
    "can you recommend something for me": ["Sure, I can recommend something. What are you interested in?", "Recommendations coming right up! What are your preferences?"],
    "whats the current time": ["The current time is [insert current time here].", getFormattedTime()],
    "how can i create a new channel": ["You can create a new channel by clicking the plus icon next to the channel list.", "Creating a new channel is easy! Just follow these steps..."],
    "im feeling lost": ["Feeling lost? Don't worry, I'm here to help you find your way!", "Let's figure out where you are and how to get back on track."],
    "im hungry, what should i eat": ["I can't eat, but I can definitely recommend some delicious dishes!", "Food is one of my favorite topics. What are you hungry for?"],
    "can you help me find a job": ["Looking for a job? I can help you search and prepare for interviews.", "Let's find the perfect job for you! What type of work are you interested in?"],
    "i forgot my password what should i do": ["If you're having trouble logging in, make sure your credentials are correct and try again.", "Double-check your login information and try logging in again."],
    "im having trouble connecting to the server": ["If you're having trouble connecting to the server, check your internet connection and try again.", "Server issues can be frustrating. Let's troubleshoot the problem together."],
    "whats your favorite tv show": ["There are so many great TV shows to choose from! What genre do you enjoy?", "I love binge-watching TV shows! What series are you currently watching?"],
    "what does this symbol mean": ["Symbols can have various meanings. What symbol are you curious about?", "Let's explore the meaning behind that symbol together."],
    "im feeling lonely": ["Feeling lonely? I'm here to chat and keep you company.", "You're not alone! I'm here to keep you company and provide support."],
    "how do i upload a file": ["To upload a file, click the file upload icon and select the file you want to upload.", "Uploading a file is easy! Just follow these steps..."],
    "tell me about yourself": ["Sure, I'd love to tell you about myself. I'm a chatbot designed to assist you with various tasks and provide information.", "I'm here to help you! What would you like to know about me?"],
    "can you guide me through a meditation session": ["Meditation is a great way to relax and reduce stress. Would you like me to guide you through a meditation session?", "Meditation has many benefits for mental and physical health. Let's explore it together."],
    "i need to relax": ["Relaxing is important for overall well-being. What activities help you relax?", "Take some time to unwind and relax. You deserve it!"],
    "can you help me with my homework": ["Stuck on homework? I'm here to help you understand and complete your assignments.", "Let's tackle that homework together! What subject are you working on?"],
    "i need some entertainment": ["I'd be happy to entertain you! What type of entertainment are you in the mood for?", "Let's have some fun! How can I entertain you?"],
    "how do i adjust my notification settings": ["You can customize your notification settings in the app or website.", "Notifications can be adjusted to suit your preferences. What notifications do you want to receive?"],
    "lets play a game": ["Playing games is a great way to pass the time and have fun. What type of game do you enjoy?", "I love playing games! What's your favorite game genre?"],
    "whats the population of china": ["The population of China is over 1.4 billion.", "China has the largest population in the world, with over 1.4 billion people."],
    "i could use some uplifting": ["Feeling down? I'm here to lift your spirits!", "Let's turn that frown upside down! What usually cheers you up?"],
    "can you create a poll for me": ["Creating a poll is a great way to gather opinions and feedback. What question do you want to ask?", "Polls are a fun way to engage with others. What topic do you want to poll about?"],
    // Add more user inputs and responses here
};

// Define default responses
const defaultResponses = [
    "I'm not sure how to respond to that.",
    "Could you please rephrase your question?",
    "Hmm, interesting! I'll have to look into that.",
    "I'm still learning! Can you ask me something else?",
    "Sorry, I didn't catch that. Can you repeat?",
    "I'm not programmed to understand that. Try asking me something else.",
];

// Function to select a random response from an array
function getRandomResponse(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to map synonyms to the same response
function addSynonym(primaryInput, synonyms) {
    synonyms.forEach(synonym => {
        responses[synonym.toLowerCase()] = responses[primaryInput.toLowerCase()];
    });
}

// Add synonyms here
addSynonym("bye", ["see you later", "farewell"]);
addSynonym("hello", ["hi", "sup", "howdy"]);

// Event listener for when the bot is ready
client.on('ready', async () => {
    console.log(`${client.user.username} has been initiated, please check Kade-E ai on Test-tv`);
});

// Event listener for incoming messages
client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    const input = message.content.toLowerCase().trim();

    // Check if the message starts with "/"
    if (input.startsWith('/')) {
        const command = input.substring(1); // Remove the '/' character
        handleCommand(message, command);
        return; // Exit the function to prevent further processing
    }

    // Check if the lowercase input matches any predefined response or commands
    if (responses.hasOwnProperty(input)) {
        // Check if the user is asking for the current time
        if (input === "whats the current time") {
            const currentTime = getFormattedTime();
            const currentDate = getFormattedDate();
            message.reply(`${currentDate} ${currentTime}`);
        } else {
            const randomResponse = getRandomResponse(responses[input]);
            message.reply(randomResponse);
        }
    } else {
        // If input doesn't match, reply with a random default response
        const randomDefaultResponse = getRandomResponse(defaultResponses);
        message.reply(randomDefaultResponse);
    }
});

// Function to handle commands
function handleCommand(message, command) {
    switch (command) {
        case 'help':
            message.reply('Some help may be to use the, /info, /commands, /prompts, /listcoms, listsyns for further information.');
            break;
        case 'info':
            message.reply('This is a Discord bot designed to assist users with various tasks.');
            break;
        case 'commands':
            message.reply('Here are all of the main available commands: /help, /info, /commands, /date, /prompts, /listsyns, if you would like a list of all the commands please type the command /listcoms.');
            break;
        case 'prompts':
            message.reply('All of the avalible prompts are: hello, how are you, test, bye, give me weather update, can you recommend a movie, im bored what should i do, how do i change my profile picture, how can i customize my settings, i need help with something, can you recommend something for me, whats the current time, how can i create a new channel, im hungry, what should i eat, can you help me find a job, i forgot my password what should i do, im having trouble connecting to the server, whats your favorite tv show, what does this symbol mean, im feeling lonely, how do i upload a file, tell me about yourself, can you guide me through a meditation session, i need to relax, can you help me with my homework, i need some entertainment, how do i adjust my notification settings, lets play a game, whats the population of china, i could use some uplifting, can you create a poll for me,');
            break;
        case 'date':
            const currentTime = getFormattedTime();
            const currentDate = getFormattedDate();
            message.reply(`${currentDate} ${currentTime}`);
            break;
       case 'listsyns':
            message.reply('A list of all of the available synonym prompts are: hi, sup, howdy, see you later, farewell, I hope this helped :).');
            break;
            default:
            message.reply('Invalid command. Type /commands to see the available commands.');
            break;
    }
}

// Login to Discord with your bot's token
client.login(token);
