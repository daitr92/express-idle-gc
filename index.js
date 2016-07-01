/**
 * Created by kahn on 04/06/2016.
 */
'use strict'

module.exports = {
    start: function (httpInstance) {
        if (global.gc) {
            setInterval(() => {
                httpInstance.getConnections((err, count) => {
                    if (count === 0) {
                        const heapLimit = Number(process.env.EXPRESS_IDLE_GC_HEAP_LIMIT) || 100
                        const mem = process.memoryUsage()
                        const heapUsed = mem.heapUsed/1024/1024
                        if (heapUsed > heapLimit) {
                            global.gc()
                        }
                    }
                })
            }, Number(process.env.EXPRESS_IDLE_GC_INTERVAL) || 30000)
        }
    }
}