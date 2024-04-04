module.exports = class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }

  getRightChildIdx(idx) {
    return idx * 2 + 2;
  }

  getLeftChildIdx(idx) {
    return idx * 2 + 1;
  }

  swapNodes(fnIdx, sdIdx) {
    const temp = this.heap[fnIdx];
    this.heap[fnIdx] = this.heap[sdIdx];
    this.heap[sdIdx] = temp;
  }

  bubbleDown(currIdx) {
    const leftChildIdx = this.getLeftChildIdx(currIdx);
    const rightChildIdx = this.getRightChildIdx(currIdx);
    let smallestChildIdx = currIdx;

    if (
      leftChildIdx < this.heap.length &&
      this.heap[leftChildIdx].value < this.heap[smallestChildIdx].value
    ) {
      smallestChildIdx = leftChildIdx;
    }

    if (
      rightChildIdx < this.heap.length &&
      this.heap[rightChildIdx].value < this.heap[smallestChildIdx].value
    ) {
      smallestChildIdx = rightChildIdx;
    }

    if (smallestChildIdx !== currIdx) {
      this.swapNodes(currIdx, smallestChildIdx);
      this.bubbleDown(smallestChildIdx);
    }
  }

  bubbleUp(currIdx) {
    if (currIdx === 0) {
      return;
    }

    const parentIdx = this.getParentIdx(currIdx);
    if (this.heap[currIdx].value < this.heap[parentIdx].value) {
      this.swapNodes(currIdx, parentIdx);
      this.bubbleUp(parentIdx);
    }
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return minValue;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
};
