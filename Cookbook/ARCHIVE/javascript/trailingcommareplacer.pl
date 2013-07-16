# ==============================================================
# = Trailing Comma Replacer for JavaScript and other languages =
# ==============================================================

# Removes extra (trailing) commas like {,} [,] {,\n} [,\n]

opendir(DIR, ".") or die("Cannot open current dir!");
my @files = grep(/\.js$/,readdir(DIR));
foreach my $file (@files) {
	my $outfile = "$file";
	# READING
	open(INPUTFILE, "< $file") or die("Cannot open $file for reading");
	print "Read from $file\n";
	my $content = join("", <INPUTFILE>);
	close(INPUTFILE);
	$content =~ s/\,([ |\n\r|\t]+\})/$1/g;
	$content =~ s/\,([ |\n\r|\t]+\])/$1/g;
	$content =~ s/\,\]/\]/g;
	$content =~ s/\,\}/\}/g;
	#WRITING
	open(OUTPUTFILE, "> $outfile") or die("Cannot open $file for writing");
	print OUTPUTFILE $content;
	print "Output written to $outfile\n";
	close(OUTPUTFILE);
}

