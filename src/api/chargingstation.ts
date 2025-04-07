import {post, get} from '@/utils/http'
import type{RowType} from "@/types/station"

interface ListType {
  id?:string,
  name?:string,
  status:number,
  page: number,
  pageSize: number
}

interface RevenueType {
  page: number,
  pageSize: number,
  name: string
}

enum Api{
  List = '/stationList',
  Edit = 'station/edit',
  Delete = "station/delete",
  RevenueChart = "/revenueChart",
  Revenue = "/revenueList",
  CurrentList = "/currentList"
}


function listApi(data: ListType) {
  return post(Api.List, data)
}

function editApi(data: RowType) {
  return post(Api.Edit, data)
}

function deleteApi(data: RowType) {
  return post(Api.Delete, data)
}

function chartApi() {
  return get(Api.RevenueChart)
}

function revenueApi(data: RevenueType) {
  return post(Api.Revenue, data)
}

function currentListApi() {
  return post(Api.CurrentList)
}

export {
  listApi,
  editApi,
  deleteApi,
  chartApi,
  revenueApi,
  currentListApi
}
