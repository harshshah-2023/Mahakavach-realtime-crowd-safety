import { uuid } from "../utils/uuid";

export const chatStore = {
  messages: {
    // Example structure:
    // harbour: [{ id, text, votes, ts, pinned }]
  },

  // Simulate sending message (UI only)
  send(lineId, text) {
    if (!this.messages[lineId]) this.messages[lineId] = [];
    this.messages[lineId].push({
      id: uuid(),
      text,
      votes: 0,
      ts: Date.now(),
      pinned: false,
      type: "user",
    });
  },

  // Simulate crowd/system messages
  pushSystem(lineId, text) {
    if (!this.messages[lineId]) this.messages[lineId] = [];
    this.messages[lineId].push({
      id: uuid(),
      text,
      votes: 0,
      ts: Date.now(),
      pinned: false,
      type: "system",
    });
  },

  // Upvotes (Frontend-only for now)
  vote(lineId, msgId) {
    const msg = this.messages[lineId].find((m) => m.id === msgId);
    if (msg) msg.votes += 1;
  },
};
