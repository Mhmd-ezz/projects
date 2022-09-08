const gulp = require('gulp');
const purgecss = require('gulp-purgecss')

gulp.task('purgecss', () => {
    return gulp.src('./dist/styles.*.css')
        .pipe(purgecss({
            content: [
                'src/**/*.ts',
                'src/**/*.html',
                'node_modules/@syncfusion/**/dist/**/*.js',
                'node_modules/@syncfusion/**/src/**/*.js'
            ],
            whitelistPatterns: [
                /mat-/,
                /cdk-/,
                /e-split*/
            ],
            whitelistPatternsChildren: [
                /ql-*/,
                /pswp-*/,
                
                /e-schedule-toolbar-container/,
                /e-toolbar$/,
                /e-colorpicker-wrapper/,
                /e-dropdown-btn/
            ]

        }))
        .pipe(gulp.dest('./dist'))
})