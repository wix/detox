interface AnyOf {
    <A>(a: A): A;
    <A, B>(a: A, b: B): A | B;
    <A, B, C>(a: A, b: B, c: C): A | B | C;
    <A, B, C, D>(a: A, b: B, c: C, d: D): A | B | C | D;
}

declare const anyOf: AnyOf;

const config: Detox.DetoxConfig = {
    testRunner: "nyc jest",
    runnerConfig: "e2e/config.js",
    specs: "e2e/*.test.js",
    behavior: {
        init: {
            reinstallApp: true,
            exposeGlobals: true,
        },
        launchApp: 'auto',
        cleanup: {
            shutdownDevice: false,
        },
    },
    artifacts: {
        rootDir: 'artifacts',
        pathBuilder: 'e2e/pathbuilder.js',
        plugins: {
            log: {
                enabled: true,
                keepOnlyFailedTestsArtifacts: false,
            },
            screenshot: {
                enabled: true,
                keepOnlyFailedTestsArtifacts: false,
                shouldTakeAutomaticSnapshots: true,
                takeWhen: {
                    testStart: false,
                    testFailure: true,
                    testDone: false,
                    appNotReady: true,
                },
            },
            video: {
                enabled: true,
                keepOnlyFailedTestsArtifacts: false,
            },
            instruments: {
                enabled: true
            },
            timeline: {
                enabled: true,
            },
            uiHierarchy: {
                enabled: true,
            },
        },
    },
    configurations: {
        "ios.none": {
            type: "ios.none",
            session: {
                server: "ws://localhost:8099",
                sessionId: "com.wix.detox-example"
            },
        },
        "ios.sim.debug": {
            type: "ios.simulator",
            binaryPath: "ios/build/Build/Products/Debug-iphonesimulator/example.app",
            build: "some build command",
            artifacts: {
                plugins: {
                    log: anyOf('none', 'failing', 'all'),
                    screenshot: anyOf('none', 'manual', 'failing', 'all'),
                    video: anyOf('none', 'failing', 'all'),
                    instruments: anyOf('none', 'all'),
                    timeline: anyOf('none', 'all'),
                    uiHierarchy: anyOf('disabled', 'enabled'),
                },
            },
            device: "iPhone 12 Pro Max",
        },
        "ios.sim.release": {
            type: "ios.simulator",
            binaryPath: 'path/to/ios.app',
            build: "some build command",
            device: anyOf(
              { id: 'GUID-GUID-GUID-GUID' },
              { type: 'iPad Mini' },
              { name: 'iPad Mini-Detox' },
              { os: 'iOS 9.3.6' },
            ),
        },
        "android.manual": {
            type: "android.emulator",
            binaryPath: "android/app/build/outputs/apk/fromBin/debug/app-fromBin-debug.apk",
            testBinaryPath: "path/to/test.apk",
            utilBinaryPaths: ["path/to/util1.apk"],
            build: anyOf(undefined, ':'),
            artifacts: false,
            device: { avdName: "Pixel_API_28" },
            behavior: {
                launchApp: "manual"
            },
            session: {
                autoStart: true,
                server: "ws://localhost:8099",
                sessionId: "test"
            }
        },
        "android.attached": {
            type: "android.attached",
            binaryPath: "android/app/build/outputs/apk/fromBin/release/app-fromBin-release.apk",
            build: "some command",
            device: {
                adbName: "emulator-5554"
            }
        },
        "android.genycloud.uuid": {
            type: "android.genycloud",
            device: {
                recipeUUID: "a50a71d6-da90-4c67-bdfa-5b602b0bbd15"
            },
            binaryPath: "android/app/build/outputs/apk/fromBin/release/app-fromBin-release.apk",
        },
        "android.genycloud.release2": {
            type: "android.genycloud",
            device: {
                recipeName: "Detox_Pixel_API_29"
            },
            binaryPath: "android/app/build/outputs/apk/fromBin/release/app-fromBin-release.apk",
        },
        stub: {
            type: "./integration/stub",
            name: "integration-stub",
            device: {
                integ: "stub"
            }
        }
    }
};
