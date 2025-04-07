<template>
  <div>
    <el-row :gutter='20'>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>今日总收入（元）</h4>

          </div>
          <div class="total mt">
            <h1>{{ formatNumberToThousands(114514) }}</h1>
            <div class="percent jianju">+27%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>本月总收入 (万元)</h4>
          </div>
          <div class="total mt">
            <h1>2888</h1>
            <div class="percent1 jianju">-21%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>会员卡储值金 (元)</h4>
          </div>
          <div class="total mt">
            <h1>{{ formatNumberToThousands(610918) }}</h1>
            <div class="percent1 jianju">-16%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>服务费总金额 (元)</h4>
          </div>
          <div class="total mt">
            <h1>{{ formatNumberToThousands(89757) }}</h1>
            <div class="percent jianju">+7%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>停车费总金额 (元)</h4>
          </div>
          <div class="total mt">
            <h1>9999</h1>
            <div class="percent1 jianju">-4%</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="4">
        <el-card>
          <div class="title">
            <div class="round">
              <el-icon>
                <Document />
              </el-icon>
            </div>
            <h4>电费总金额 (元)</h4>
          </div>
          <div class="total mt">
            <h1>{{ formatNumberToThousands(188888) }}</h1>
            <div class="percent jianju">+19%</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="mt">
      <div ref="chartRef" style="width: 100%; height: 300px"></div>
    </el-card>
    <el-card class="mt">
      <el-input 
      v-model="name" 
      placeholder="请输入充电站名称" 
      style="max-width: 400px;"
      >
      <template #append>
        <el-button icon="Search" @click="loadData"></el-button>
      </template>
    </el-input>
      <el-table :data="tableData" v-loading="loading">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column label="充电站名称" prop="name"></el-table-column>
        <el-table-column label="充电站ID" prop="id"></el-table-column>
        <el-table-column label="所属城市" prop="city"></el-table-column>
        <el-table-column label="充电桩总量(个)" prop="count"></el-table-column>
        <el-table-column label="单日收入(元)" prop="day" sortable>
          <template #default="scope">
            <div class="income-cell">
             <span>{{ scope.row.day }}</span>
             <el-tag :type="scope.row.percent > 0 ? 'success' : 'danger'" class="ml jianju">
              {{ scope.row.percent > 0 ? "+" + scope.row.percent + "%" : scope.row.percent + "%" }}
             </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="月度总收入(万元)" prop="month">
          <template #default="scope">
            <span>{{ scope.row.month }}</span>
            <el-tag :type="scope.row.mpercent > 0 ? 'success' : 'danger'" class="ml jianju">
              {{ scope.row.mpercent > 0 ? "+" + scope.row.mpercent + "%" : scope.row.mpercent + "%" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="电费营收(元)" prop="electricity"></el-table-column>
        <el-table-column label="停车费营收(元)" prop="parkingFee"></el-table-column>
        <el-table-column label="服务费营收(元)" prop="serviceFee"></el-table-column>
        <el-table-column label="会员储值金(元)" prop="member"></el-table-column>
      </el-table>

      <el-pagination 
      class="fr mt mb" 
      v-model:current-page="pageInfo.page" 
      v-model:page-size="pageInfo.pageSize"
      background 
      :page-sizes="[10, 20, 30, 40]" 
      layout="total, sizes, prev, pager, next, jumper" 
      :total="totals"
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      />

    </el-card>
  </div>
</template>

<script lang="ts" setup>
import formatNumberToThousands from '@/utils/toThousands'
import { onMounted, reactive, ref } from 'vue'
import { chartApi, revenueApi } from '@/api/chargingstation';
import { useChart } from '@/hooks/useChart'
import { usePagination } from '@/hooks/usePaginations';

const chartRef = ref(null)
const name = ref('')
const setChartData = async () => {
  const chartOptions = reactive({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月']
    },
    yAxis: [
      {
        type: 'value',
        name: '销售',
        position: 'left'
      },
      {
        type: 'value',
        name: '访问量',
        position: 'right'
      }
    ],
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
        yAxisIndex: 0,
        itemStyle: {
          color: '#409eff'
        }
      },
      {
        name: '',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        itemStyle: {
          color: '#409eff'
        },
        smooth: true
      }
    ]
  });
  const res = await chartApi()
  chartOptions.legend.data = res.data.list.map((item: any) => item.name)
  for (let i = 0; i < res.data.list.length; i++) {
    chartOptions.series[i].name = res.data.list[i].name
    chartOptions.series[i].data = res.data.list[i].data
  }
  return chartOptions
}
useChart(chartRef, setChartData)

const tableData = ref([])
const loading = ref(false)
const totals = ref(0)
const loadData = async () => {
  loading.value = true
  const { data: { list, total } } = await revenueApi({ ...pageInfo,name: name.value })
  loading.value = false
  totals.value = total
  tableData.value = list.map((item: any) => ({
    ...item,
    day:item.electricity+item.parkingFee+item.serviceFee+item.member
  })
)}
const {pageInfo,handleCurrentChange,handleSizeChange} = usePagination(loadData)
onMounted(() => {
  loadData()
})
</script>

<style lang="less" scoped>
.income-cell {
  display: flex;
  align-items: center;
}

.title {
  height: 30px;
  display: flex;
  align-items: center;

  .round {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    text-align: center;
    line-height: 30px;
    margin-right: 20px;
  }

  h4 {
    color: #666;
  }
}

.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .jianju {
  margin-left: auto;    /* 关键样式：自动左外边距推动元素到最右侧 */
  white-space: nowrap;  /* 防止百分比换行 */
}

  h1 {
    font-size: 30px;
    margin-right: 20px;
  }

  .percent {
    display: inline-block;
    padding: 3px 5px;
    height: 20px;
    font-size: 12px;
    background-color: rgb(235, 247, 239);
    border-radius: 2px;
    color: green;
    line-height: 20px;
  }
  .percent1 {
    display: inline-block;
    padding: 3px 5px;
    height: 20px;
    font-size: 12px;
    background-color: rgb(235, 247, 239);
    border-radius: 2px;
    color: red;
    line-height: 20px;
  }
}
</style>