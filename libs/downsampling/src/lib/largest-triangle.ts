type Point = {
  x: number
  y: number
}

function area(A: Point, B: Point, C: Point): number {
  return 0.5 * Math.abs(A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y))
}
function averageInBucket(bucket: Point[]): Point {
  if (bucket.length === 0) {
    throw new Error(`Bucket is empty`)
  }
  const x = bucket.map(({ x }) => x).reduce((a, b) => a + b, 0) / bucket.length
  const y = bucket.map(({ y }) => y).reduce((a, b) => a + b, 0) / bucket.length
  return { x, y }
}

function getBest(last: Point, current: Point[], next: Point): Point {
  const areas = current.map((p) => area(last, p, next))
  let bestArea = 0
  let bestIndex = 0
  for (let i = 0; i < areas.length; i++) {
    if (areas[i] > bestArea) {
      bestArea = areas[i]
      bestIndex = i
    }
  }
  return current[bestIndex]
}

/**
 * Downsampling function using largest triangles with 3 buckets
 * @see https://skemman.is/bitstream/1946/15343/3/SS_MSthesis.pdf
 * @param data - The original data
 * @param threshold - How many datapoints should remain
 */
export function largestTriangle(data: Point[], threshold: number): Point[] {
  if (data.length <= threshold) {
    return data
  }
  console.log("abc")
  console.time("Downsample")

  /**
   *
   * Split the data across all buckets.
   * The first bucket contains the first datapoint and the last bucket the last datapoint.
   * The rest is split evenly
   */

  const buckets: Point[][] = []
  buckets.push([data[0]])
  const middle = data.slice(1, buckets.length - 2)
  for (let t = threshold - 2; t > 0; t--) {
    buckets.push(middle.splice(0, Math.ceil(middle.length / t)))
  }
  buckets.push([data[threshold - 1]])

  /**
   * In every bucket except the first and last we take the point that forms the biggest triangle
   * together with the best point from the last bucket and the average of the next bucket.
   */
  const reducedData: Point[] = []
  reducedData.push(data[0])

  for (let i = 1; i < buckets.length - 1; i++) {
    const last = reducedData[i - 1]
    const current = buckets[i]
    const next = buckets[i + 1]
    const bestPoint = getBest(last, current, averageInBucket(next))
    reducedData.push(bestPoint)
  }
  reducedData.push(data[data.length - 1])
  console.timeEnd("Downsample")
  return reducedData
}
