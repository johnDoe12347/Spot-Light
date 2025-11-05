import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useState } from "react";
import { Text, View } from "react-native";
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
  return (
    <View>
      <Text>CommentsModal</Text>
    </View>
  );
}
