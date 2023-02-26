<template>
  <svg class="squiggly" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="squiggly1">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.04"
          numOctaves="3"
          result="noise"
          seed="0"
        />
        <feDisplacementMap
          id="displacement"
          in="SourceGraphic"
          in2="noise"
          scale="6"
        />
      </filter>
      <filter id="squiggly2">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.04"
          numOctaves="3"
          result="noise"
          seed="1"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
      </filter>
      <filter id="squiggly3">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.04"
          numOctaves="3"
          result="noise"
          seed="2"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
      </filter>
      <filter id="squiggly4">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.04"
          numOctaves="3"
          result="noise"
          seed="3"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
      </filter>
      <filter id="squiggly5">
        <feTurbulence
          id="turbulence"
          baseFrequency="0.04"
          numOctaves="3"
          result="noise"
          seed="4"
        />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
.squiggly {
  position: absolute;
  z-index: -2;
}
</style>
