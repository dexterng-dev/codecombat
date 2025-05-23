<template lang="pug">
  .panel
    h2(v-if="loading") Loading...
    .tab-select
      .tab(@click="tab = 'byMonth'" :class="{active: tab === 'byMonth'}") By Time
      .tab(v-if="!hideByStudentTab()" @click="tab = 'byStudent'" :class="{active: tab === 'byStudent'}") By Student
    template(v-if="tab === 'byMonth'")
      .header-row(v-if="licenseDaysByMonth && viewport === 'full'")
        h2 License Days by Month
        button.btn.btn-primary.download-csv(@click="downloadMonthlyCSV") Download as CSV
      p(class="link-info") Access the new dashboard with graphs
        a(href="/partner-dashboard?fromOld=1" target="_blank")  {{ $t('general.here') }}
      table.table.table-condensed(v-if="!licenseStatsLoading && viewport === 'full'")
        tr(class="odd")
          th.month.border {{ $t('library.month') }}
          th.number.border {{ $t('library.license_days_used') }}
          th.number.border {{ $t('library.licenses_used') }}
          th.number.border {{ $t('library.users_active_licenses') }}
          th.number.border {{ $t('library.new_signups') }}
          th.number.border {{ $t('library.lines_code') }}
          th.number.border {{ $t('library.programs_written') }}
          th.number.border {{ $t('library.time_spent_min') }}
        tr(v-for="(stats, row) in licenseDaysByMonth" :class="{odd: row % 2 == 1, even: row % 2 == 0, sum: stats.month == 'Total'}")
          td.month.border {{stats.month}}
          td.number.border {{stats.licenseDaysUsed.toLocaleString()}}
          td.number.border {{stats.licensesUsed?.toLocaleString()}}
          td.number.border {{ stats.activeLicenses?.toLocaleString() || '-' }}
          td.number.border {{ stats.newSignups || '-' }}
          td.number.border {{ stats.progress?.linesOfCode || '-' }}
          td.number.border {{ stats.progress?.programs || '-' }}
          td.number.border {{ parseInt(stats.progress?.playtime / 60) || '-' }}

      .header-row(v-if="licenseDaysByMonthAndTeacher && viewport=='full'")
        h2 License Days by Month and Teacher/Classroom
        button.btn.btn-primary.download-csv(@click="downloadCSV") Download as CSV
      table.table.table-condensed(v-if="licenseDaysByMonthAndTeacher")
        tr(class="odd")
          th.month.border {{ $t('library.month') }}
          th.name.border {{ $t('library.teacher_classroom_name') }}
          th.name.border(v-if="spiedUser") Classroom ownerId
          th.number.border {{ $t('library.license_days_used') }}
          th.number.border {{ $t('library.licenses_used') }}
          th.number.border {{ $t('library.users_active_licenses') }}
        tr(v-for="(stats, row) in licenseDaysByMonthAndTeacher" :class="{odd: row % 2 == 1, even: row % 2 == 0, sum: stats.teacher == 'Total'}")
          td.month.border {{stats.month}}
          td.name.border {{stats.teacher?.split('!!!')[0]}}
          td.name.border(v-if="spiedUser") {{stats.teacher?.split('!!!').length > 1 ? stats.teacher?.split('!!!')[1] : '-'}}
          td.number.border {{stats.licenseDaysUsed.toLocaleString()}}
          td.number.border {{stats.licensesUsed.toLocaleString()}}
          td.number.border {{stats.activeLicenses.toLocaleString()}}

      .age-stats(v-if="ageStats.length > 0")
        d3-bar-chart(:datum="ageStats", :config="this.ageChartConfig()", title="Users Age Split", source="Age ranges")

    template(v-else-if="tab === 'byStudent'")
      license-data-per-user(:loading="loading" :prepaids="prepaids" :teacherMap="teacherMap")

</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import LicenseDataPerUser from 'app/components/license/LicenseDataPerUser'
import { D3BarChart } from 'vue-d3-charts'

module.exports = Vue.extend({
  components: {
    LicenseDataPerUser,
    D3BarChart,
  },
  props: {
    viewport: {
      type: String,
      default: 'full',
    },
  },
  data () {
    return {
      tab: 'byMonth',
      spiedUser: window.serverSession.amActually,
      myId: me.get('_id'),
    }
  },
  computed: {
    ...mapState('apiClient', {
      licenseStatsLoading: function (s) {
        return s.loading.byLicense
      },
      teacherLoading: function (s) {
        return s.loading.teachers
      },
      licenseStats: function (s) {
        return s.licenseStats
      },
      clientId: function (s) {
        return s.clientId
      },
      clientName: function (s) {
        return me.get('name').replace(/[0-9]*$/g, '')
      },
      createdTeachers: s => s.createdTeachers || [],
    }),
    ...mapState('prepaids', {
      prepaidLoading: function (s) {
        return s.loading.byTeacher[this.myId]
      },
      prepaids: function (s) {
        return s.prepaids.byTeacher[this.myId]
      },
    }),
    ...mapGetters(
      'me', [
        'isAnonymous',
        'isAPIClient',
      ],
    ),
    loadingStatuses () {
      return [this.licenseStatsLoading, this.teachersLoading, this.prepaidLoading]
    },
    loading () {
      return this.loadingStatuses.reduce((r, i) => r || i, false)
    },
    teacherMap () {
      const createdTeachers = window._.indexBy(this.createdTeachers, '_id')
      createdTeachers[this.myId] = Object.assign({ _trialRequest: { organization: 'Yourself' } }, me.attributes)
      return createdTeachers
    },
    licenseDaysByMonth () {
      const byMonth = []
      const months = _.keys(this.licenseStats.licenseDaysByMonth).sort().reverse()
      const summary = {
        month: 'Total',
        licenseDaysUsed: 0,
        progress: {
          linesOfCode: 0,
          programs: 0,
          playtime: 0,
        },
        newSignups: 0,
        ageStats: 0,
        licensesUsed: 0,
      }
      for (const month of months) {
        const stat = this.licenseStats.licenseDaysByMonth[month]
        byMonth.push({
          month,
          licenseDaysUsed: stat.daysUsed,
          activeLicenses: stat.noOfRedeemers,
          progress: stat.progress,
          newSignups: stat.newSignups,
          ageStats: stat.ageStats,
          licensesUsed: stat.licensesUsed,
        })
        summary.licenseDaysUsed += stat.daysUsed || 0
        summary.progress.linesOfCode += stat.progress?.linesOfCode || 0
        summary.progress.programs += stat.progress?.programs || 0
        summary.progress.playtime += stat.progress?.playtime || 0
        summary.newSignups += stat.newSignups || 0
        summary.licensesUsed += stat.licensesUsed || 0
      }
      if (byMonth.length) {
        byMonth.push(summary)
      }
      return byMonth
    },
    licenseDaysByMonthAndTeacher () {
      const byMonthAndTeacher = []
      let hadMoreThanOne = false
      let months = _.keys(this.licenseStats.licenseDaysByMonth).sort().reverse()
      if (this.viewport !== 'full') {
        months = months.slice(0, 1)
      }
      for (const month of months) {
        const stat = this.licenseStats.licenseDaysByMonth[month]
        for (const teacher in stat.teachers) {
          const s = stat.teachers[teacher]
          byMonthAndTeacher.push({
            month,
            teacher,
            licenseDaysUsed: s.daysUsed,
            activeLicenses: s.noOfRedeemers,
            licensesUsed: s.licensesUsed,
          })
        }
        if (_.size(stat.teachers) > 1) {
          hadMoreThanOne = true
        }
        byMonthAndTeacher.push({
          month,
          teacher: 'Total',
          licenseDaysUsed: stat.daysUsed,
          activeLicenses: stat.noOfRedeemers,
          licensesUsed: stat.licensesUsed,
        })
      }
      if (!hadMoreThanOne) {
        return null
      }
      return byMonthAndTeacher
    },
    ageStats () {
      const data = []
      const stats = this.licenseStats?.ageStats
      const totalUsersWithAge = Object.values(this.licenseStats?.ageStats || {})?.reduce((acc, cnt) => acc + cnt, 0)
      for (const age in stats) {
        const ageStr = age === '13-15' ? 'Under 15' : age
        if (totalUsersWithAge > 0) {
          data.push({ ageRange: ageStr, usersNum: stats[age], '% of users': Math.round((stats[age] / totalUsersWithAge) * 100) })
        }
      }
      return data
    },
  },
  watch: {
    clientId: function (id) {
      if (id !== '') {
        this.fetchTeachers(id)
        this.fetchPrepaids({ teacherId: this.myId, clientId: id })
        this.fetchLicenseStats({ clientId: id })
      }
    },
  },
  created () {
    if (me.isGeccClient()) {
      this.tab = 'byStudent'
    }

    this.fetchClientId()
    // current play time for apiclient is the total time of all students so i think
    // we doesn't need it now
    /* this.fetchPlayTimeStats() */
  },
  methods: {
    ...mapActions({
      fetchLicenseStats: 'apiClient/fetchLicenseStats',
      fetchPlayTimeStats: 'apiClient/fetchPlayTimeStats',
      fetchClientId: 'apiClient/fetchClientId',
      fetchPrepaids: 'prepaids/fetchPrepaidsForAPIClient',
      fetchTeachers: 'apiClient/fetchTeachers',
    }),
    ageChartConfig () {
      return {
        key: 'ageRange',
        values: ['% of users'],
        axis: {
          yTicks: 10,
          yFormat: '.0f',
          yTitle: 'Percentage of users',
          xTitle: 'Age Ranges',
          xFormat: '.0f',
          xTicks: 0,
        },
      }
    },
    hideByStudentTab () {
      return !me.isGeccClient()
    },
    downloadCSV () {
      if (!this.licenseDaysByMonthAndTeacher) return

      // Define headers
      const headers = [
        'Month',
        'Teacher/Classroom',
        ...(this.spiedUser ? ['Classroom ownerId'] : []),
        'License Days Used',
        'Licenses Used',
        'Active Licenses',
      ]

      // Convert data to CSV format
      const csvData = this.licenseDaysByMonthAndTeacher.map(stats => {
        const row = [
          stats.month,
          stats.teacher?.split('!!!')[0] || '',
          ...(this.spiedUser ? [stats.teacher?.split('!!!')[1] || '-'] : []),
          stats.licenseDaysUsed,
          stats.licensesUsed,
          stats.activeLicenses,
        ]
        // Properly escape CSV fields
        return row.map(field => {
          // Convert to string and check if needs escaping
          const stringField = String(field)
          if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
            // Escape double quotes and wrap in quotes
            return '"' + stringField.replace(/"/g, '""') + '"'
          }
          return stringField
        }).join(',')
      })

      // Combine headers and data
      const csvContent = [
        headers.join(','),
        ...csvData,
      ].join('\n')

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      const currentDate = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `license_stats_${currentDate}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadMonthlyCSV () {
      if (!this.licenseDaysByMonth) return

      // Define headers
      const headers = [
        this.$t('library.month'),
        this.$t('library.license_days_used'),
        this.$t('library.licenses_used'),
        this.$t('library.users_active_licenses'),
        this.$t('library.new_signups'),
        this.$t('library.lines_code'),
        this.$t('library.programs_written'),
        this.$t('library.time_spent_min'),
      ]

      // Convert data to CSV format
      const csvData = this.licenseDaysByMonth.map(stats => {
        const row = [
          stats.month,
          stats.licenseDaysUsed,
          stats.licensesUsed,
          stats.activeLicenses || '-',
          stats.newSignups || '-',
          stats.progress?.linesOfCode || '-',
          stats.progress?.programs || '-',
          parseInt(stats.progress?.playtime / 60) || '-',
        ]
        return row.join(',')
      })

      // Combine headers and data
      const csvContent = [
        headers.join(','),
        ...csvData,
      ].join('\n')

      // Create and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      const currentDate = new Date().toISOString().split('T')[0]
      link.setAttribute('download', `monthly_license_stats_${currentDate}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
  },
})
</script>

<style lang="scss" scoped>
.panel {
  color: black;
}
.tab-select {
  margin: 10px;
  font-size: 24px;
  font-weight: 400;

  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #eee;

  .tab {
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;

    &.active{
      border: 2px solid black;
    }

  }
}
td.number, th.number {
  padding-right: 1em;
}
th, td {
  text-align: center;
}
tr.odd {
  background-color: rgba(255, 196, 8, 0.1);
}
tr.sum {
  background-color:(rgba(31, 186, 180, 0.2) !important);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 15px;

  h2 {
    margin: 0;  // Remove default margin to align properly
  }

  .download-csv {
    margin-left: 15px;
  }
}
</style>
