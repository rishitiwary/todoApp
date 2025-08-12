
// Task 1


// This function finds the length of the longest increasing subsequence (LIS) in an array of numbers.
function findLIS(nums) {
    if (nums.length === 0) {
        return [];
    }
    
    const dp = new Array(nums.length).fill(1);
    const prev = new Array(nums.length).fill(null);
    let maxLength = 1;
    let endIndex = 0;
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            endIndex = i;
        }
    }
    
    // Reconstruct the subsequence
    const lis = [];
    let currentIndex = endIndex;
    while (currentIndex !== null) {
        lis.unshift(nums[currentIndex]);
        currentIndex = prev[currentIndex];
    }
    
    return lis;
}

const nums = [10, 9, 2, 5, 3, 7, 101, 18];
const longestSubsequence = findLIS(nums);
console.log(`The longest increasing subsequence is: [${longestSubsequence}]`);
console.log(`Its length is: ${longestSubsequence.length}`);

// Task2
// This function finds two indices of numbers in an array that add up to a given target.
// It uses a hash map to store the indices of the numbers as it iterates through the array.

function twoSum(nums, target) {
  const numMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];
    const complement = target - currentNum;
    if (numMap.has(complement)) {
      return [numMap.get(complement), i];
    }
    numMap.set(currentNum, i);
  }
  throw new Error("No two sum solution found.");
}

const nums1 = [2, 7, 11, 15];
const target1 = 9;
const result1 = twoSum(nums1, target1);
console.log(`For nums = [${nums1}] and target = ${target1}, the indices are: [${result1}]`); // Expected: [0, 1]


// Task 3
// This MongoDB aggregation pipeline calculates the total revenue and average price of items sold per store per month.
// It unwinds the items array, calculates total item price, groups by store and month,
// and finally projects the required fields including average price.
// Ensure you have a MongoDB instance running and the 'sales' collection is created.



db.sales.insertMany([
  {
    date: ISODate("2024-06-15T00:00:00Z"),
    store: "Store A",
    items: [
      { name: "item1", quantity: 5, price: 10.0 },
      { name: "item2", quantity: 3, price: 20.0 }
    ]
  },
  {
    date: ISODate("2024-06-20T00:00:00Z"),
    store: "Store B",
    items: [
      { name: "item3", quantity: 2, price: 15.0 },
      { name: "item4", quantity: 4, price: 5.0 }
    ]
  },
  {
    date: ISODate("2024-07-01T00:00:00Z"),
    store: "Store A",
    items: [
      { name: "item5", quantity: 10, price: 5.0 }
    ]
  },
  {
    date: ISODate("2024-07-10T00:00:00Z"),
    store: "Store B",
    items: [
      { name: "item6", quantity: 5, price: 10.0 }
    ]
  }
]);

// Aggregation pipeline to calculate total revenue and average price per store per month
db.sales.aggregate([
  {
    "$unwind": "$items"
  },
  {
    "$addFields": {
      "items.totalItemPrice": { "$multiply": ["$items.quantity", "$items.price"] }
    }
  },
  {
    "$group": {
      "_id": {
        "store": "$store",
        "month": { "$dateToString": { "format": "%Y-%m", "date": "$date" } }
      },
      "totalRevenue": { "$sum": "$items.totalItemPrice" },
      "itemsCount": { "$sum": "$items.quantity" },
      "totalPrice": { "$sum": "$items.price" }
    }
  },
  {
    "$project": {
      "_id": 0,
      "store": "$_id.store",
      "month": "$_id.month",
      "totalRevenue": "$totalRevenue",
      "averagePrice": { "$divide": ["$totalPrice", "$itemsCount"] }
    }
  },
  {
    "$sort": {
      "store": 1,
      "month": 1
    }
  }
]);
