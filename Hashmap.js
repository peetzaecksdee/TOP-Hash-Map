class Node {
	constructor(key, val = null, next = null) {
		this.key = key;
		this.val = val;
		this.next = next;
	}
}

class HashMap {
	constructor() {
		this.hashMap = new Array(16);
		this.loadFactor = 0.75;
		this.size = 0;
	}

	*hash(key) {
		let hashCode = 0;

		let primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode %= self.hashMap.length;
		}

		return hashCode;
	}

	set(key, val) {
		if (this.isReachedLoadFactor()) this.resize();

		const code = this.hash(key);
		const newNode = new Node(key, val);
		if (this.hashMap[code] == null) {
			this.size = 1;
			this.hashMap[code] = newNode;
		} else {
			let curr = this.hashMap[code];
			while (curr.next != null) {
				curr = curr.next;
			}
			curr.next = newNode;
		}
	}

	isReachedLoadFactor() {
		return this.size / this.hashMap.length >= this.loadFactor;
	}

	resize() {
		const oldMap = this.hashMap;
		this.hashMap = new Array(this.hashMap.length * 2);
		this.size = 0;
		oldMap.forEach((bucket) => {
			let curr = bucket;
			while (curr != null) {
				this.set(curr.key, curr.val);
				curr = curr.next;
			}
		});
	}

	get(key) {
		const code = this.hash(key);
		let curr = this.hashMap[code];
		while (curr) {
			if (curr.key === key) return curr.val;
			curr = curr.next;
		}
		return null;
	}

	has(key) {
		return this.get(key) ? true : false;
	}
}

let hashMap = new HashMap();
hashMap.set('a', 'cc');
console.log(hashMap.get('a'));
