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

	hash(key) {
		let hashCode = 0;

		let primeNumber = 31;
		for (let i = 0; i < key.length; i++) {
			hashCode = primeNumber * hashCode + key.charCodeAt(i);
			hashCode %= this.hashMap.length;
		}

		return hashCode;
	}

	set(key, val) {
		if (this.isReachedLoadFactor()) this.resize();

		const code = this.hash(key);
		const newNode = new Node(key, val);
		if (this.hashMap[code] == null) {
			this.hashMap[code] = newNode;
		} else {
			let curr = this.hashMap[code];
			while (curr.next != null) {
				curr = curr.next;
			}
			curr.next = newNode;
		}
		this.size++;
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
			while (curr) {
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

	remove(key) {
		const code = this.hash(key);
		let keyPlace = this.hashMap[code];
		if (keyPlace) {
			this.hashMap[code] = null;
			this.size--;
			return true;
		}
		return false;
	}

	get length() {
		return this.size;
	}

	clear() {
		this.hashMap = new Array(16);
		this.size = 0;
	}

	keys() {
		let keysArray = [];
		this.hashMap.forEach((bucket) => {
			let curr = bucket;
			while (curr) {
				keysArray.push(curr.key);
				curr = curr.next;
			}
		})
		return keysArray;
	}
}

let hashMap = new HashMap();
hashMap.set('a', 'cc');
hashMap.set('bb', 'efg');
hashMap.set('hell', 'heaven');
hashMap.set('better', 'good');
console.log(hashMap.get('a'));
console.log(hashMap.get('hell'));
console.log(hashMap.length);
console.log(hashMap.keys());
console.log(hashMap.remove('a'));
console.log(hashMap.length);
console.log(hashMap.remove('a'));
hashMap.clear();
console.log(hashMap.get('better'));
