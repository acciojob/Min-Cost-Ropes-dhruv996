class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallerChildIndex = null;

      if (leftChildIndex < this.heap.length) {
        smallerChildIndex = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
        smallerChildIndex = rightChildIndex;
      }

      if (smallerChildIndex !== null && this.heap[smallerChildIndex] < this.heap[currentIndex]) {
        this.swap(currentIndex, smallerChildIndex);
        currentIndex = smallerChildIndex;
      } else {
        break;
      }
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
}

function minCost(arr) {
  if (arr.length < 2) {
    return 0; // No cost if there is only one rope or no rope
  }

  const minHeap = new MinHeap();

  // Insert all ropes into the min-heap
  for (const ropeLength of arr) {
    minHeap.insert(ropeLength);
  }

  let totalCost = 0;

  // Connect ropes until there is only one rope left
  while (minHeap.heap.length > 1) {
    const firstMin = minHeap.extractMin();
    const secondMin = minHeap.extractMin();

    const currentCost = firstMin + secondMin;
    totalCost += currentCost;

    minHeap.insert(currentCost);
  }

  return totalCost;
}

function calculateMinCost() {
  const ropeLengthsInput = document.getElementById('ropeLengths').value;
  const ropeLengths = ropeLengthsInput.split(',').map(length => parseInt(length.trim()));

  const result = minCost(ropeLengths);

  document.getElementById('result').innerText = `Minimum Cost: ${result}`;
}

