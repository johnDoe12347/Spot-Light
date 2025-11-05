import { COLORS } from "@/constant/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { Ionicons } from "@expo/vector-icons";

import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Comment from "./Comment";
type CommentsModal = {
  postId: Id<"posts">;
  visible: boolean;
  onClose: () => void;
  onCommentAdded: () => void;
};
export default function CommentsModal({
  postId,
  visible,
  onClose,
  onCommentAdded,
}: CommentsModal) {
  const [newComment, setNewComment] = useState("");
  const comments = useQuery(api.comments.getComment, { postId });
  const addComment=useMutation(api.comments.addComment);
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await addComment({
        content: newComment,
        postId,
      });
      setNewComment("");
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };
  return (
    <Modal visible={visible} onRequestClose={onClose} animationType="slide">
      <KeyboardAvoidingView behavior="padding" style={styles.modalContainer}>
        <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose}>
             <Ionicons name="close" size={24} color={COLORS.whitecolour}/>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Comments</Text>
            <View style={{width:24}}/>
        </View>
        {comments === undefined ? (
            <ActivityIndicator/>
        ):(
            <FlatList data={comments} renderItem={({item})=><Comment comment={item}/>} contentContainerStyle={styles.commentsList}/>
        )}
        <View style={styles.commentInput}>
          <TextInput
            style={styles.input}
            placeholder="Add a comment..."
            placeholderTextColor={COLORS.greycolor}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity onPress={handleAddComment} disabled={!newComment.trim()}>
            <Text style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
