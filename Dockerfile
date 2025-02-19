FROM ubuntu:22.04


RUN apt-get update && apt-get install -y \
    openjdk-17-jdk-headless \
    curl \
    unzip \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*


ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/ndk/26.2.11394342:$PATH

# Install Android SDK
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools \
    && curl -fo sdk.zip https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip \
    && unzip sdk.zip -d $ANDROID_SDK_ROOT/cmdline-tools \
    && mv $ANDROID_SDK_ROOT/cmdline-tools/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest \
    && rm sdk.zip

# Accept licenses and install essential SDK tools
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0" \
               "ndk;27.1.12297006" "cmake;3.31.0"

# Set NDK environment variables
ENV NDK_VERSION=27.1.12297006
ENV CMAKE_VERSION=3.31.0
ENV ANDROID_NDK_HOME=$ANDROID_SDK_ROOT/ndk/$NDK_VERSION
ENV PATH=$ANDROID_NDK_HOME:$ANDROID_SDK_ROOT/cmake/$CMAKE_VERSION/bin:$PATH

# Install Node.js & Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn

# Install Gradle
RUN wget https://services.gradle.org/distributions/gradle-8.10.2-all.zip -P /tmp && \
    unzip /tmp/gradle-8.10.2-all.zip -d /opt && \
    ln -s /opt/gradle-8.10.2 /opt/gradle && \
    echo 'export PATH=$PATH:/opt/gradle/bin' >> /etc/profile

# Set working directory
WORKDIR /app

# Cache Gradle for optimization
RUN mkdir -p /root/.gradle && \
    echo "org.gradle.daemon=true\norg.gradle.parallel=true\norg.gradle.caching=true" > /root/.gradle/gradle.properties

# Default command
CMD ["bash"]
