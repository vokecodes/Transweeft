import { IReview } from "@/constants/interface";
import { StyleSheet, Text, View } from "react-native";

const ReviewCard = ({ review }: { review: IReview }) => {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewName}>{review.name}</Text>
        <Text>⭐ {review.stars}</Text>
      </View>
      <Text>{review.comment}</Text>
      <Text style={styles.reviewTime}>{review.time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  reviewName: { fontWeight: "600" },
  reviewTime: { fontSize: 11, color: "#999", marginTop: 4 },
});

export default ReviewCard;
