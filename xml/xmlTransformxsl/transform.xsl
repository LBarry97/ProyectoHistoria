<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<head>
				<style rel="stylesheet" type="text/css">
					td{background-color: #FFA115;}
					th{background-color: #A6602E;}
				</style>
			</head>
			<body>
				<h2>Preguntas:</h2>
				<table border="1">
					<tr>
						<th>Titulo</th>
						<th>Opcion</th>
						<th>Respuesta</th>
					</tr>
					<xsl:for-each select="questions/question">
						<tr>
							<td><xsl:value-of select="title"/></td>
							<td>
								<xsl:for-each select="option">
								<xsl:value-of select="position()-1"/>: <xsl:value-of select="text()"/><br/>
								</xsl:for-each>
							</td>
							<td>
								<xsl:for-each select="answer">
								<xsl:value-of select="text()"/><br/>
								</xsl:for-each>       
							</td>
						</tr>
					</xsl:for-each>
				</table>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>