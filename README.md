# React Native [Web] + Monorepo

## 100% code sharing between Web, iOS and Android

### How to run

-   `$ git clone git@github.com:brunolemos/react-native-web-monorepo.git`
-   `$ cd react-native-web-monorepo`
-   `$ yarn`
-   Web
    -   [CRA] `$ yarn workspace web-cra start`
    -   [Next.js] `$ yarn workspace web-nextjs dev`
-   Mobile
    -   [iOS]
        -   `$ cd packages/mobile/ios && pod update && pod install && cd -`
        -   [CLI]
            -   `$ yarn ios`
        -   [Xcode]
            -   `$ yarn workspace mobile start`
            -   `yarn xcode`
            -   Press the Run button
    -   [Android]
        -   [CLI]
            -   `$ yarn android`
        -   [Android Studio]
            -   `$ yarn workspace mobile start`
            -   `yarn studio`
            -   Press the Run button
