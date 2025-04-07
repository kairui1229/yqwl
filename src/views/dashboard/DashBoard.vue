<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <el-card>
        <div class="title">
          <h3>今日设备运行状态</h3>
          <p class="ml">当前时间：{{ currentTime }}</p>
          <el-icon color="#86909c" style="margin-left: 5px; cursor: pointer" @click="handleRefresh"
            :class="{ 'rotate-animation': isRotating }">
            <Refresh />
          </el-icon>
        </div>
        <div class="equitment">
          <div v-for="(item, index) in equipments" :key="index" class="item">
            <h4 class="mt mb">{{ item.title }}</h4>
            <img :src="item.img" class="mt mb" />
            <h1 class="md">{{ item.used }} / {{ item.total }}</h1>
            <div class="statistic-card">
              <el-statistic :value="item.abnormal">
                <template #title>
                  <div style="display: inline-flex; align-items: center">
                    异常设备
                    <el-tooltip effect="dark" :content="`当前有${item.abnormal.value}台设备异常，请尽快处理!`" placement="top">
                      <el-icon style="margin-left: 4px" :size="12">
                        <Warning />
                      </el-icon>
                    </el-tooltip>
                  </div>
                </template>
              </el-statistic>
              <div class="statistic-footer">
                <div class="footer-item">
                  <span>相较昨日</span>
                  <span class="green">
                    {{ item.percent }}%
                    <el-icon color="green">
                      <CaretTop />
                    </el-icon>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h1>常用功能</h1>
          </div>
        </template>
        <div class="quick mt mb">
          <el-row>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '报警处理',
              url: '/alarm',
              icon: 'Phone' // 替换为实际使用的图标组件名
            })">
              <img :src="repair">
              <p>设备维修</p>
            </el-col>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '订单管理',
              url: '/operations/orders',
              icon: 'DocumentCopy' // 替换为实际使用的图标组件名
            })">
              <img :src="daily">
              <p>每日日报</p>
            </el-col>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '会员卡管理',
              url: '/equipment',
              icon: 'Magnet' // 替换为实际使用的图标组件名
            })">
              <img :src="progress">
              <p>任务进度</p>
            </el-col>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '营收统计',
              url: '/chargingstation/revenue',
              icon: 'DataAnalysis' // 替换为实际使用的图标组件名
            })">
              <img :src="total">
              <p>营收占比</p>
            </el-col>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '营收统计',
              url: '/chargingstation/revenue',
              icon: 'DataAnalysis' // 替换为实际使用的图标组件名
            })">
              <img :src="money">
              <p>营收统计</p>
            </el-col>
            <el-col :span="4" style="cursor: pointer" @click="navigateTo({
              name: '报警处理',
              url: '/alarm',
              icon: 'Phone' // 替换为实际使用的图标组件名
            })">
              <img :src="remain">
              <p>代办事项</p>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h1>能源统计</h1>
          </div>
        </template>
        <el-row>
          <el-col :span="8" class="adjust-col">
            <div ref="chartRef2" style="width: 100%;height: 400px;"></div>
          </el-col>
          <el-col :span="16">
            <div ref="chartRef" style="width: 100%;height: 400px;"></div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card>
        <template #header>
          <div class="card-header">
            <h1>设备总览</h1>
          </div>
        </template>
        <div ref="chartRef3" style="width: 100%;height: 240px;"></div>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-header">
            <h1>营收统计表</h1>
          </div>
        </template>
        <ul class="ranking-list">
          <li class="ranking-item">
            <span class="rank" style="background-color: rgb(103, 194, 58);color: #fff;">1</span>
            <span class="store-name">北京</span>
            <span class="sales">635,467</span>
            <span style="margin-left:50px">
              37%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank" style="background-color:rgb(64, 158, 255) ;color: #fff ;">2</span>
            <span class="store-name">上海</span>
            <span class="sales">323,234</span>
            <span style="margin-left: 50px;">
              29%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank" style="background-color:rgb(230, 162, 60) ;color: #fff ;">3</span>
            <span class="store-name">深圳</span>
            <span class="sales">192,255</span>
            <span style="margin-left: 50px;">
              24%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">4</span>
            <span class="store-name">广州</span>
            <span class="sales">147,540</span>
            <span style="margin-left: 50px;">
              20%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">5</span>
            <span class="store-name">郑州</span>
            <span class="sales">142,337</span>
            <span style="margin-left: 50px;">
              32%
              <el-icon color="red">
                <CaretBottom />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">6</span>
            <span class="store-name">芜湖</span>
            <span class="sales">89,941</span>
            <span style="margin-left: 50px;">
              10%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
          <li class="ranking-item">
            <span class="rank">7</span>
            <span class="store-name">蚌埠</span>
            <span class="sales">56,221</span>
            <span style="margin-left: 50px;">
              22%
              <el-icon color="green">
                <CaretTop />
              </el-icon>
            </span>
          </li>
        </ul>
      </el-card>
      <el-card class="mt">
        <template #header>
          <div class="card-heder">
            <h1>故障报警</h1>
          </div>
        </template>
        <el-timeline style="max-width: 600px">
          <el-timeline-item timestamp="2024/12/29" placement="top" :hollow="true" type="danger">
            <el-card>
              <h4>北京东路通讯中断</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2024/11/18" placement="top" :hollow="true" type="warning">
            <el-card>
              <h4>黄河南路超出服务区域</h4>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2024/9/17" placement="top" :hollow="true" type="danger">
            <el-card>
              <h4>6号机组异常断电</h4>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import repair from "@/assets/repair.png"
import progress from "@/assets/progress.png"
import remain from "@/assets/remain.png"
import total from "@/assets/total.png"
import money from "@/assets/money.png"
import daily from "@/assets/daily.png"
import { reactive, ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useChart } from '@/hooks/useChart'
import { chartDataApi, chartDataApi2, chartDataApi3 } from '@/api/dashboard'
import { useRouter } from 'vue-router'
import { useTabsStore } from '@/store/tabs'
import { Warning, CaretTop } from "@element-plus/icons-vue";

const chartRef = ref(null)
const chartRef2 = ref(null)
const chartRef3 = ref(null)

const setChartData = async () => {
  const chartOptions: any = reactive({
    title: {
      text: '电量统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: []
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: "{value}kw"
      }
    },
    series: [
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: {
          width: 4
        },
        smooth: true
      },
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: {
          width: 4
        },
        smooth: true
      },
      {
        name: '',
        type: 'line',
        data: [],
        lineStyle: {
          width: 4
        },
        smooth: true
      },
    ]
  })
  const res = await chartDataApi()
  chartOptions.legend.data = res.data.list.map((item: any) => item.name)
  for (let i = 0; i < res.data.list.length; i++) {
    chartOptions.series[i].name = res.data.list[i].name
    chartOptions.series[i].data = res.data.list[i].data
  }
  return chartOptions
}
const setChartData2 = async () => {
  const chartOptions: any = reactive({
    legend: {
      top: 'bottom'
    },
    tooltip: {
      trigger: "item",
      formatter: '{a}<br/>{b}:{c}'
    },
    series: [
      {
        name: '营收占比',
        type: 'pie',
        radius: ["50%", "60%"],
        center: ['50%', '50%'],
        roseType: "area",
        emphasis: {
          label: {
            show: true,
            fontSize: "16",
            fontWeight: "bold"
          }
        },
        data: []
      }
    ],
    graphic: {
      type: 'text',
      left: "center",
      top: "center",
      style: {
        text: "营收占比",
        fontSize: 20,
        fill: "#333"
      }
    }
  })
  const res = await chartDataApi2()
  chartOptions.series[0].data = res.data.list;
  return chartOptions
}
const setChartData3 = async () => {
  const chartOptions = reactive({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '闲置数', max: 65 },
        { name: '使用数', max: 160 },
        { name: '故障数', max: 300 },
        { name: '维修数', max: 380 },
        { name: '更换数', max: 520 },
        { name: '报废数', max: 250 }
      ]
    },
    series: [
      {
        name: '设备总览',
        type: 'radar',
        data: [
          {
            value: [],
            name: '设备总览'
          },

        ]
      }
    ]
  })
  const res = await chartDataApi3();
  chartOptions.series[0].data[0].value = res.data.list
  return chartOptions
}

// setChartData()
// setChartData2()
// setChartData3()

useChart(chartRef, setChartData)
useChart(chartRef2, setChartData2)
useChart(chartRef3, setChartData3)

const isRotating = ref(false);

const handleRefresh = () => {
  isRotating.value = true;
  // 动画持续时间 0.5s + 100ms 缓冲
  setTimeout(() => {
    location.reload();
  }, 600);
};

const tabsStore = useTabsStore()
const router = useRouter()

const navigateTo = (menuItem: {
  name: string,
  url: string,
  icon: string
}) => {
  // 添加标签页
  tabsStore.addTab(menuItem.name, menuItem.url, menuItem.icon)
  // 设置当前标签
  tabsStore.setCurrentTab(menuItem.name, menuItem.url)
  // 执行路由跳转
  router.push(menuItem.url)

  // 如果需要保留动画效果
  document.documentElement.classList.add('route-transition')
  setTimeout(() => {
    document.documentElement.classList.remove('route-transition')
  }, 300)
}

const currentTime = ref('')
let timer: any = null

// 格式化时间为：YYYY年MM月DD日 HH:mm:ss
const formatDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}

// 更新时间函数
const updateTime = () => {
  currentTime.value = formatDateTime()
}

// 初始化定时器
onMounted(() => {
  updateTime() // 立即更新一次
  timer = setInterval(updateTime, 1000) // 每秒更新
})

// 清除定时器
onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

// 随机数生成函数
const getRandomNumber = (min:any, max:any) => Math.floor(Math.random() * (max - min + 1)) + min;
// 设备数据
const equipments = [
  {
    title: "充电站使用率",
    total: 34,
    img: flash3,
    used: computed(() => getRandomNumber(20, 34)), // 随机生成使用中的数量
    abnormal: computed(() => getRandomNumber(1, 15)), // 异常设备
    percent: computed(() => getRandomNumber(5, 25)), // 变化百分比
  },
  {
    title: "充电柜使用率",
    total: 123,
    img: flash2,
    used: computed(() => getRandomNumber(90, 123)),
    abnormal: computed(() => getRandomNumber(10, 30)),
    percent: computed(() => getRandomNumber(10, 35)),
  },
  {
    title: "充电桩使用率",
    total: 1229,
    img: flash,
    used: computed(() => getRandomNumber(900, 1229)),
    abnormal: computed(() => getRandomNumber(20, 200)),
    percent: computed(() => getRandomNumber(5, 45)),
  },
];
</script>

<style lang="less" scoped>
/* 新增动画样式 */
:deep(.el-icon) {
  transition: transform 0.3s;

  &.rotate-animation {
    animation: rotate 0.5s linear;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.title {
  display: flex;
  align-items: flex-end;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;

  p {
    color: #86909c;
  }
}

.equitment {
  display: flex;
  justify-content: space-between;
  padding: 0 50 px;
  gap: 20px; /* 让每个 item 之间留点间距 */
  .item {
    h1 {
      font-size: 30px;
      flex: 1; /* 让所有 .item 等宽 */
      min-width: 200px; /* 防止过窄 */
    }
  }
}

.quick {

  margin-top: 30px;
  text-align: center;

  p {
    margin-top: 10px;
    color: #333;
  }
}

.ranking-list {
  .ranking-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;

    .rank {
      display: inline-block;
      font-weight: bold;
      color: #666;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      text-align: center;
      line-height: 30px;
    }

    .store-name {
      flex-grow: 1;
      padding: 0 10px;
    }

    .sales {
      color: #666;
    }
  }

  .ranking-item:nth-child(even) {
    background-color: rgb(253, 246, 236);
  }
}

.adjust-col {
  margin-top: -22px;
  /* 数值越大上移越多 */
  /* 如果需要更精准控制 */
  position: relative;
  top: -22px;
}
</style>