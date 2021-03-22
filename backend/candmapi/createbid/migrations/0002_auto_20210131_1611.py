# Generated by Django 3.1.5 on 2021-01-31 10:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='singletenderdetails',
            name='emdwaivedoff',
        ),
        migrations.AddField(
            model_name='singletenderdetails',
            name='vendor',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='createbid.vendor'),
        ),
        migrations.AlterField(
            model_name='tenderstages',
            name='stage',
            field=models.CharField(max_length=50),
        ),
    ]