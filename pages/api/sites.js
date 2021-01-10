import db from "@/lib/firebase-admin";

export default async (_, res) => {
  try {
    const snapshot = await db.collection("sites").get();
    const sites = snapshot.docs.map((snap) => ({
      id: snap.id,
      ...snap.data(),
    }));

    return res.status(200).json({
      sites,
    });
  } catch (e) {
    console.log(e.message);
  }
};
