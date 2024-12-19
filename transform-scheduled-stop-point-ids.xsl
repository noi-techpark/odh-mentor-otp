<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="3.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xmlns:n="http://www.netex.org.uk/netex"
  xsi:schemaLocation="http://www.netex.org.uk/netex https://raw.githubusercontent.com/NeTEx-CEN/NeTEx/master/xsd/NeTEx_publication.xsd"
  exclude-result-prefixes="n"  >

  <!-- Identity template to copy every node and attribute by default -->
  <xsl:mode on-no-match="shallow-copy"/>

  <!-- Replace the ids of ScheduledStopPoints from this format


  -->
  <xsl:template match="//n:ScheduledStopPoint/@id">
    <xsl:attribute name="id">
      <xsl:value-of select="replace(replace(., '.*ScheduledStopPoint:(.+?):$', '$1'), '-', ':')"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="//n:RoutePointRef/@ref">
    <xsl:attribute name="ref">
      <xsl:value-of select="replace(replace(., '.*ScheduledStopPoint:(.+?):$', '$1'), '-', ':')"/>
    </xsl:attribute>
  </xsl:template>

  <xsl:template match="//n:ScheduledStopPointRef/@ref">
    <xsl:attribute name="ref">
      <xsl:value-of select="replace(replace(., '.*ScheduledStopPoint:(.+?):$', '$1'), '-', ':')"/>
    </xsl:attribute>
  </xsl:template>
</xsl:stylesheet>