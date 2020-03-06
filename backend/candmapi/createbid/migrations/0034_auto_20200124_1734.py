# Generated by Django 2.2.5 on 2020-01-24 12:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('createbid', '0033_auto_20200122_1009'),
    ]

    operations = [
        migrations.AddField(
            model_name='participatedbidders',
            name='submittedonline',
            field=models.CharField(default='Offline', max_length=100),
        ),
        migrations.CreateModel(
            name='PaymentDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('paymentfor', models.CharField(max_length=30)),
                ('paymentdetails', models.CharField(max_length=1000)),
                ('bid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='createbid.Bid')),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='createbid.Vendor')),
            ],
        ),
    ]