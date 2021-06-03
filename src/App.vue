<template>
  <div>
    <Header />
    <br />
    <CountryTable :metaObject="masterMetaObject()" />
  </div>
</template>

<script>
import CountryTable from "./components/CountryTable.vue";
import Header from "./components/Header.vue";
import externalMetaData from "./assets/metaData.json";

export default {
  name: "App",
  components: {
    CountryTable,
    Header,
  },
  methods: {},
  data() {
    return {
      metaObject: {},
      masterMetaObject: function () {
        console.log("externalMetaData :", externalMetaData);
        return externalMetaData;
      },
    };
  },
};
</script>
