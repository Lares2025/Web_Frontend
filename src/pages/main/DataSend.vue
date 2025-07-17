<template>
  <div :style="centerWrapper">
    <!-- 콘솔 박스 -->
    <div :style="containerMiddle">
      <div :style="connectBoxMiddle">
        <div :style="contain">
          <div :style="box1">
            <div :style="box2">
              <input
                type="number"
                placeholder="데이터 개수"
                :style="dataNumber"
              />
              <select v-model="selectedOrder" :style="dataArray">
                <option value="up">오름차순</option>
                <option value="down">내림차순</option>
              </select>
              <button :style="sendBtn">제어 전송</button>
            </div>
          </div>
          <div :style="line" />
        </div>
      </div>
    </div>
    <!-- 오른쪽 이미지 박스 -->
    <div :style="imgBoxWrapper">
      <button :style="loadBtn" @click="fetchImage">불러오기</button>
      <div :style="imgContainer">
        <img v-if="imgSrc" :src="imgSrc" :style="imgStyle" alt="제어 이미지" />
        <div v-else :style="imgPlaceholder">이미지가 없습니다</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      centerWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        gap: "64px",
      },
      containerMiddle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      connectBoxMiddle: {
        position: "relative",
        display: "flex",
        gap: "30px",
        width: "572px",
        height: "278px",
        padding: "20px",
        border: "1px solid #CECCE5",
        borderRadius: "15px",
      },
      contain: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      },
      box1: {
        display: "flex",
        flexDirection: "row",
        gap: "12px",
      },
      box2: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      },
      line: {
        width: "100%",
        height: "1px",
        backgroundColor: "#CECCE5",
      },
      selectedOrder: "up",
      imgBoxWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "350px",
        height: "278px",
        border: "1px solid #CECCE5",
        borderRadius: "15px",
        background: "#fff",
        gap: "16px",
        boxSizing: "border-box",
      },
      loadBtn: {
        width: "120px",
        height: "40px",
        borderRadius: "8px",
        border: "none",
        background: "#0C007B",
        color: "#fff",
        fontFamily: "PretendardBold",
        fontSize: "15px",
        cursor: "pointer",
      },
      imgContainer: {
        width: "300px",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F6F6F6",
        borderRadius: "10px",
        overflow: "hidden",
      },
      imgStyle: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
      },
      imgPlaceholder: {
        color: "#818181",
        fontFamily: "PretendardLight",
        fontSize: "16px",
      },
      imgSrc: null,
    };
  },
  computed: {
    dataNumber() {
      return {
        width: "80px",
        height: "14px",
        padding: "12px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardRegular",
        fontSize: "12px",
        color: "#2C2C2C",
        backgroundColor: "#F6F6F6",
      };
    },
    dataArray() {
      return {
        width: "100px",
        height: "39px",
        padding: "10px 10px",
        border: "1px solid #CECCE5",
        borderRadius: "10px",
        fontFamily: "PretendardThin",
        fontSize: "12px",
        color: "#2C2C2C",
        backgroundColor: "#F6F6F6",
        margin: "0px 250px 0px 0px",
      };
    },
    sendBtn() {
      return {
        width: "100px",
        height: "39px",
        padding: "10px 22px",
        borderRadius: "8px",
        border: "none",
        fontFamily: "PretendardBold",
        fontSize: "12px",
        color: "#FFFFFF",
        backgroundColor: "#0C007B",
      };
    },
    actionBtn() {
      return {
        width: "150px",
        height: "39px",
        padding: "10px 22px",
        margin: "20px",
        borderRadius: "8px",
        border: "none",
        fontFamily: "PretendardBold",
        fontSize: "12px",
        color: "#FFFFFF",
        backgroundColor: "#0C007B",
      };
    },
  },
  methods: {
    async fetchImage() {
      try {
        const response = await fetch("/lares/api/control/img", {
          method: "GET",
          headers: {
            Accept: "image/jpeg",
          },
        });
        if (!response.ok) throw new Error("이미지 불러오기 실패");
        const blob = await response.blob();
        if (!blob.type.startsWith("image/")) {
          const text = await blob.text();
          console.log(text);
          alert("이미지 대신 받은 데이터: " + text);
          this.imgSrc = null;
          return;
        }
        this.imgSrc = URL.createObjectURL(blob);
      } catch (e) {
        this.imgSrc = null;
        alert("이미지 불러오기에 실패했습니다.");
      }
    },
  },
};
</script>

<style scoped>
input::placeholder {
  color: #818181;
  font-family: "PretendardThin";
}
</style>
<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
