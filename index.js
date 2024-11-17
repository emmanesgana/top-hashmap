class HashMap {
    // Create a constructor that has a loadfactor(default) = 75%  and initalcapacity = 16 params
    constructor(loadFactor = 0.75, initialCapactiy = 16) {
        this.loadFactor = loadFactor;
        this.capacity = initialCapactiy;
        this.size = 0;

        // Create array buckets and fill with null as initial value and map as empty array as many as the capacity
        this.buckets = Array(this.capacity).fill(null).map(() => []);
    }

    // Use the same logicc as the example but add modulo to each iteration to avoid over the bucket's length
    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }

        return hashCode;
    }

    // Create resize to resize and re-hash when load factor exceeded buckets
    resize() {
        const prevBuckets = this.buckets;
        this.capacity *= 2;
        this.size = 0;
        this.buckets = Array(this.capacity).fill(null).map(() => []);

        // Loop through the previous bucket and assign a new set of key and value
        for (const bucket of prevBuckets) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    // Set a key value pair for the hash
    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) {
                bucket.splice(bucket.indexOf([k, v]), 1, [key, value]);
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    /* 
    Create get(key) which takes on argument as a key and returns the value that is assigned to this key.
    If a key is not found, return null.
    */
    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const [k, v] of bucket) {
            if (k === key) {
                return v;
            }
        }

        return null;
    }

    /* 
    Create has(key) which takes key as an argument and returns the value that is assigned to this key.
    If a key is not found, return null.
    */
    has(key) {
        return this.get(key);
    }

    /* 
    Create remove(key) which takes key as an argument. If the given key is in the hash map, it should remove
    the entr with that key and return true. If the key isn't in the hash map, it should return false.
    */
    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            const [k] = bucket[i];

            if (k === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    /* 
    Create length() which returns the number of stored keys in the hash map.
    */
    length() {
        return this.size;
    }

    /*  
    Creat clear() which remove all entries in the hash map
    */
    clear() {
        this.buckets = Array(this.capacity).fill(null).map(() => []);
        this.size = 0;
        return 'Emptied List';
    }

    /* 
    Create key() which returns an aray containing all the keys inside the hash map
    */
    keys() {
        const keys = [];
        for (const bucket of this.buckets) {
            for (const [key] of bucket) {
                keys.push(key);
            }
        }

        return keys;
    }

    /* 
    Create values() which returns an array containing all the values
    */
    values() {
        const values = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                values.push(value);
            }
        }

        return values;
    }

    /* 
    Create entries() which returns an array that contains each key, vlaue pair.
    Example: [[firstKey, firstValue], [secondKey, secondValue]]
    */
    entries() {
        const entries = [];

        for (const bucket of this.buckets) {
            for (const [key, value] of bucket) {
                entries.push([key, value]);
            }
        }

        return entries;
    }

}

const test = new HashMap();

/* set(key,value) */
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

/* Overwrite an existing entry */
test.set('lion', 'white'); // Should change lion's value from golden to white

/* Add new entry to exceed load factor */
test.set('moon', 'silver'); // From 16 should be 32 now

/* entries() - where entries is not empty */
console.log('-- entries() --');
console.log(test.entries()); // Should return a key-value pair of all the entries


/* keys() - where entries is not empty */
console.log('-- keys() --');
console.log(test.keys()); // Should return all the keys from the entries above

/* values() - where entries is not empty */
console.log('-- values() --');
console.log(test.values()); // Should return all the value from the entries above

/* has(key) */
console.log('-- has(key) --');
console.log('Has - a key that exists:', test.has('dog')); // Should return brown as it is dog's value
console.log('Has - a key that does not exist:', test.has('giraffe')); // Should return null because giraffe is not on the list


/* remove(key) */
console.log('-- remove(key) --');
console.log('Remove - a key that exists: ', test.remove('hat')); // Should return true since hat is in the list
console.log('Remove - a key that does not exist: ', test.remove('giraffe')); // Should return true since hat is in the list

/* length() */
console.log('-- length(key) --');
console.log('Length: ', test.length()); // Originall 12 from the list above but we removed hat so it will return 11

/* clear() */
console.log('-- clear() --');
console.log(test.clear()) // Should return emptied list as indicator

/* keys() - where list is empty */
console.log('-- keys() Empty--');
console.log(test.keys()); // Should return an empty array

/* values() - where list is empty */
console.log('-- values() Empty--');
console.log(test.values()); // Should return an empty array

/* entries() - where entries is empty */
console.log('-- entries() Empty--');
console.log(test.entries()); // Should return an empty array

