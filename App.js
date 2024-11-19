import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import ChatBubble from './component/ChatBubble';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(0);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    fetchMessages(page);
  }, [page]);

  const fetchMessages = async (page) => {
    try {
      const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
      const data = await response.json();
      setMessages((prevMessages) => [...data.chats.reverse(), ...prevMessages]);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderChat = ({ item }) => {
    const isUserMessage = item.isUser;
    return (
      <View
        style={[
          styles.messageContainer,
          isUserMessage ? styles.userMessageContainer : styles.otherMessageContainer,
        ]}
      >
        {!isUserMessage && (
          <Image
            source={{ uri: 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
        )}
        <View
          style={[
            styles.chatBubble,
            isUserMessage ? styles.userBubble : styles.otherBubble,
          ]}
        >
          <Text style={styles.chatText}>{item.message}</Text>
          <Text style={styles.timestamp}>{item.time}</Text>
        </View>
      </View>
    );
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        message: inputMessage,
        isUser: true,
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
  data={messages}
  renderItem={({ item }) => <ChatBubble item={item} />}
  keyExtractor={(item) => item.id.toString()}
  getItemLayout={(data, index) => ({
    length: 80,
    offset: 80 * index,
    index,
  })}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
  onEndReached={handleLoadMore}
  onEndReachedThreshold={0.5}
  contentContainerStyle={styles.chatList}
  inverted
/>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 15,
    marginVertical: 2,
  },
  userBubble: {
    backgroundColor: '#0078fe',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  chatText: {
    fontSize: 16,
    color: '#fff',
  },
  timestamp: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 5,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#0078fe',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
