import { type Ref, onMounted, onBeforeUnmount, ref, markRaw } from "vue";
import * as echarts from 'echarts/core'; // 按需导入 echarts 核心库
import {
  LineChart,
  RadarChart,
  PieChart,
  BarChart, // 添加柱状图
} from 'echarts/charts'; // 只引入需要的图表类型（折线图，雷达图，饼图，柱状图）
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
} from 'echarts/components'; // 引入需要的组件（标题、提示框、网格等）
import { CanvasRenderer } from 'echarts/renderers'; // 引入渲染器

// 类型声明，结合了所需的系列和组件
import type {
  LineSeriesOption,
  RadarSeriesOption,
  PieSeriesOption,
  BarSeriesOption, // 添加柱状图类型声明
} from 'echarts/charts';

import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';

import type { ComposeOption } from 'echarts/core';

// 创建一个综合了必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | LineSeriesOption
  | RadarSeriesOption
  | PieSeriesOption
  | BarSeriesOption // 添加柱状图的 Option 类型
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册所有需要的组件和图表
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart, // 注册折线图
  RadarChart, // 注册雷达图
  PieChart, // 注册饼图
  BarChart, // 注册柱状图
  CanvasRenderer, // 注册渲染器
]);

// 自定义 useChart 组合函数
export function useChart(chartRef: Ref<HTMLElement | null>, setChartData: any) {
  const chartInstance = ref<echarts.ECharts | null>(null);

  // 初始化图表
  const initChart = async () => {
    if (chartRef.value) {
      chartInstance.value = markRaw(echarts.init(chartRef.value)); // 初始化图表实例
      const options: ECOption = await setChartData(); // 获取设置的数据
      chartInstance.value.setOption(options); // 设置图表的配置项
    }
  };

  // 监听窗口大小变化时重新调整图表大小
  const resizeChart = () => {
    chartInstance.value?.resize();
  };

  // 在组件挂载时初始化图表，窗口大小变化时调整图表大小
  onMounted(() => {
    initChart();
    window.addEventListener("resize", resizeChart);
  });

  // 在组件卸载时清理图表实例和事件监听
  onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeChart);
    chartInstance.value?.dispose();
  });
}
