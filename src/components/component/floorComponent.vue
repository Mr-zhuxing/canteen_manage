<template>
  <div>
    <!--floor  -->
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <!-- <div class="floor_anomaly">
        <div class="floor_one" @click="goGoodsPage">
          <img :src="floor[0].IMAGE1" width="100%" alt />
        </div>
        <div class="floor_two">
          <div @click="goGoodsPage">
            <img :src="floor[1].IMAGE1" width="100%" alt />
          </div>
          <div @click="goGoodsPage">
            <img :src="floor[2].IMAGE1" width="100%" alt />
          </div>
        </div>
      </div> -->
      <div class="floor-rule">
        <div v-for="(item,index) in floor.slice(1)" :key="index" @click="goGoodsPage(item.ID)">          
          <img :src="item.IMAGE1" width="100%" alt />
          <div>
          {{item.NAME}} ￥{{item.ORI_PRICE}}
        </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["floorData","floorTitle"],
  data() {
    return {
      floor: [{}, {}, {}],   
    };
  },
  methods:{
    goGoodsPage(ID){
      console.log()
      this.$router.push({
        name: 'goods',
        query:{
          goodsId:ID,
        }
      })
    }
  },
  created() {},
  watch: {
    floorData(newVal, oldVal) {
      this.floor = newVal;
    }
  }
};
</script>

<style scoped>
.floorTitle{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.floor_anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor_anomaly div {
  width: 10rem;
  box-sizing: border-box;
}
.floor_one {
  border-right: 1px solid #ddd;
}
.floor_two div {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  padding-right: 10px;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.floor-title{
    text-align: center;
}
</style>