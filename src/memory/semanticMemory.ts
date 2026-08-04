// Semantic memory: durable facts the agent can recall by keyword. A real system
// would use embeddings; this keyword store keeps the lab dependency-free.
export class SemanticMemory {
  private store = new Map<string, string>()

  remember(key: string, value: string): void {
    this.store.set(key.toLowerCase(), value)
  }

  recall(query: string): string | undefined {
    const q = query.toLowerCase()
    for (const [key, value] of this.store) {
      if (q.includes(key) || key.includes(q)) return value
    }
    return undefined
  }
}
