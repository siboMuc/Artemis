package ${packageName}

//TODO: add the missing inheritance
class QuickSort {

    private lateinit var a: Array<Int>
    private var n: Int = 0

    fun performSort(a: Array<Int>) {
        this.a = a
        n = a.size
        if (n != 0) quicksort(0, n - 1)
    }

    private fun quicksort(lo: Int, hi: Int) {
        var i = lo
        var j = hi

        // compare element x
        val x = a[(lo + hi) / 2]

        //  divide
        while (i <= j) {
            while (a[i] < x) i++
            while (a[j] > x) j--
            if (i <= j) {
                exchange(i, j)
                i++
                j--
            }
        }

        // recursion
        if (lo < j) quicksort(lo, j)
        if (i < hi) quicksort(i, hi)
    }

    private fun exchange(i: Int, j: Int) {
        val t = a[i]
        a[i] = a[j]
        a[j] = t
    }

}
