<template>
  <div class="tree-view">
    <div v-for="(objData, numIndex) in metaDataObjArray" :key="numIndex">
      <ul v-for="(obj, keyIndex) in objData" :key="keyIndex">
        <li>
          <span
            @click="keyClicked(keyIndex)"
            :class="openKeys.includes(keyIndex) ? 'caret-down' : 'caret'"
          ></span
          >{{ keyIndex }}
        </li>
        <li v-if="openKeys.includes(keyIndex)" class="country">
          <ul v-for="(data, countryIndex) in obj" :key="countryIndex">
            <li>
              <span
                @click="countryClicked(keyIndex, countryIndex)"
                :class="
                  openKeyCountry
                    .toString()
                    .includes([keyIndex, countryIndex].toString())
                    ? 'caret-down'
                    : 'caret'
                "
              ></span>
              {{ countryIndex }}
            </li>

            <ul
              v-if="
                openKeyCountry
                  .toString()
                  .includes([keyIndex, countryIndex].toString())
              "
              class="country"
            >
              <li v-for="(prop, propIndex) in data" :key="propIndex">
                {{ propIndex }} : {{ prop }}
              </li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    metaObject: {},
  },
  data() {
    return {
      metaDataObjArray: [],
      openKeys: [],
      closedKeys: [],
      openKeyCountry: [],
      closedKeyCountry: [],
    };
  },
  methods: {
    keyClicked(key) {
      if (this.closedKeys.includes(key)) {
        this.openKeys.push(key);
        this.closedKeys.splice(this.closedKeys.indexOf(key), 1);
      } else if (this.openKeys.includes(key)) {
        this.closedKeys.push(key);
        this.openKeys.splice(this.openKeys.indexOf(key), 1);
      }
    },
    countryClicked(key, country) {
      console.log(key, country);
      if (
        this.closedKeyCountry.toString().includes([key, country].toString())
      ) {
        this.openKeyCountry.push([key, country]);
        this.closedKeyCountry.splice(
          this.indexOfSubArray(this.closedKeyCountry, [key, country]),
          1
        );
      } else if (
        this.openKeyCountry.toString().includes([key, country].toString())
      ) {
        this.closedKeyCountry.push([key, country]);
        this.openKeyCountry.splice(
          this.indexOfSubArray(this.openKeyCountry, [key, country]),
          1
        );
      }
      console.log(this.openKeyCountry);
    },
    indexOfSubArray(array, subarray) {
      let result = "-1";
      array.every((data, index) => {
        if (data.join() == subarray.join()) {
          result = index;
          return false; // will break the loop
        } else {
          return true; // will continue the loop
        }
      });
      return result;
    },
    convertObjTOArray(obj) {
      let resultArray = [];
      let tempObj;
      if (obj instanceof Object) {
        for (let key in obj) {
          tempObj = {};
          tempObj[key] = obj[key];
          resultArray.push(tempObj);
        }
        return resultArray;
      } else {
        return resultArray;
      }
    },
  },
  mounted() {
    this.metaDataObjArray = this.convertObjTOArray({
      ...this.metaObject,
    }).slice(0, 20);

    this.metaDataObjArray.forEach((data) => {
      for (let key in data) {
        for (let country in data[key]) {
          this.closedKeyCountry.push([key, country]);
        }
      }
    });

    this.closedKeys = Object.keys(this.metaObject);
    console.log("this.closedKeyCountry :", this.closedKeyCountry);

    // console.log(this.metaDataObjArray);
  },
};
</script>

<style scoped>
.caret {
  cursor: pointer;
}

.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

.caret-down::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
  transform: rotate(90deg);
}

.tree-view{
  padding: 20px;
}

.country {
  margin-left: 45px;
}
</style>
