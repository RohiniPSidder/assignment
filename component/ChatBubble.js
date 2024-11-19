import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ChatBubble = React.memo(({ item }) => {
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
});

export default ChatBubble;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
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
    borderRadius: 10,
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  chatText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
});
